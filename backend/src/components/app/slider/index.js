import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import * as IconRegular from '@fortawesome/free-regular-svg-icons';
import PanelFunctions from '../../../containers/panel/functions';
import {ACTIONS} from '../../../utils/actions';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import Truncate from 'react-truncate';

class Slider extends Component {
    constructor(props){
        super(props);
        props.load();

        this._updateList = this._updateList.bind(this);
        this._delete     = this._delete.bind(this);

        console.log(props);
    }

    _updateList(){
        this.forceUpdate();
    }

    _delete(event, sliderId){
        event.stopPropagation();

        this.props.deleteSlider(sliderId, (datum, success) => {});
    }

    onSortEnd = ({oldIndex, newIndex, collection}) => {

    };

    render() {
        const { content, openRightPanel, createSlider, updateSlider, loading } = this.props;

        const DragHandle = SortableHandle(() => <FontAwesomeIcon onClick={(e) => {e.stopPropagation()} } className={'svg'} icon={IconSolid.faBars}/>);

        const SortableItem = SortableElement(({value}) =>
            <tr onClick={() =>
                openRightPanel(ACTIONS.PANEL_SLIDER, {
                    slider: value,
                    updateSlider: updateSlider,
                    updateList: this._updateList
                })
            }
            className={'clickable'}>
                <td className={'label'}>
                    <Truncate lines={1} ellipsis={'...'}>
                        {value.label}
                    </Truncate>
                </td>
                <td className={'no-display text'}>
                    <Truncate lines={1} ellipsis={'...'}>
                        {value.text}
                    </Truncate>
                </td>
                <td className={'action'}>
                    <DragHandle/>
                </td>
                <td className={'action'}>
                    <FontAwesomeIcon className={'svg'} icon={IconRegular.faTrashAlt} onClick={(e) => {this._delete(e,value.id)}}/>
                </td>
            </tr>
        );

        const SortableList = SortableContainer(({items}) => {
            return (
                <tbody>
                    {
                        items.sort((a, b) => a.order > b.order).map((slider, idx) => (
                            <SortableItem key={`item-${idx}`} index={idx} value={slider} />
                        ))
                    }
                </tbody>
            );
        });

        return (
            <div className={'slider list'}>
                <h1>
                    <span>{'Slider'}</span>
                    <FontAwesomeIcon icon={IconSolid.faPlusCircle} onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                        createSlider : createSlider,
                        updateList   : this._updateList
                    })} />
                </h1>
                <Table responsive striped className="tables">
                    <thead>
                        <tr>
                            <th>{'Titre'}</th>
                            <th className={'no-display'}>{'Texte'}</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <SortableList
                        items={content}
                        onSortEnd={this.onSortEnd}
                        pressDelay={0}
                        useDragHandle={true}
                        lockToContainerEdges={true}
                        lockAxis={'y'}
                        helperClass={'isDragging slider'}
                        lockOffset={'0%'}
                    />
                </Table>
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Slider);

Slider.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    deleteSlider   : PropTypes.func.isRequired,
    createSlider   : PropTypes.func,
    updateSlider   : PropTypes.func,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
