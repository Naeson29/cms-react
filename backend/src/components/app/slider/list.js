import React, {Component} from 'react';
import { Image }          from 'react-bootstrap';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import * as IconRegular   from '@fortawesome/free-regular-svg-icons/index';
import * as IconSolid     from '@fortawesome/free-solid-svg-icons/index';
import {ACTIONS}          from '../../../utils/actions';
import Truncate           from 'react-truncate';
import PropTypes          from 'prop-types';
import Config             from '../../../configuration';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove}            from 'react-sortable-hoc';

class List extends  Component {

    constructor(props){
        super(props);

        this.state = {
            items : props.content
        };

        this._sort = this._sort.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.content !== prevProps.content) {
            this.setState({
                items: this.props.content
            });
        }
    }

    _sort = ({oldIndex, newIndex}) => {
        const {orderSlider} = this.props;
        let items = arrayMove(this.state.items, oldIndex, newIndex);

        this.setState({
            items: items,
        }, () => {
            orderSlider(items);
        });
    };

    render(){
        const {openRightPanel, updateSlider, deleteLine, updateList, boxImage} = this.props;
        const {items} = this.state;
        const url = Config.get('api_url') + 'static/slider/';

        const DragHandle = SortableHandle(() => <FontAwesomeIcon onClick={(e) => {e.stopPropagation();} } className={'svg'} icon={IconSolid.faBars}/>);

        const SortableItem = SortableElement(({value, idx}) => {
            return (
                <tr onClick={() =>
                    openRightPanel(ACTIONS.PANEL_SLIDER, {
                        slider: value,
                        updateSlider: updateSlider,
                        updateList: updateList
                    })
                }
                className={'clickable'}>
                    <td className={'image'}>
                        <Image src={`${url}min_${value.image}`} thumbnail onClick={(e) => {boxImage(e,idx);}}/>
                    </td>
                    <td className={'label'}>
                        <Truncate lines={1} ellipsis={'...'}>
                            {value.label}
                        </Truncate>
                    </td>
                    <td className={'text no-display'}>
                        <Truncate lines={1} ellipsis={'...'}>
                            {value.text}
                        </Truncate>
                    </td>
                    <td className={'action'}>
                        {
                            items.length > 1 &&
                            <DragHandle/>
                        }
                    </td>
                    <td className={'action'}>
                        <FontAwesomeIcon className={'svg'} icon={IconRegular.faTrashAlt} onClick={(e) => {deleteLine(e,value.id_slider);}}/>
                    </td>
                </tr>
            );
        });

        const SortableList = SortableContainer(({items}) => {
            return (
                <tbody>
                    {
                        items.map((slider, idx) => (
                            <SortableItem key={`item-${idx}`} index={idx} idx={idx} value={slider} />
                        ))
                    }
                </tbody>
            );
        });

        return (
            <SortableList
                items={items}
                onSortEnd={this._sort}
                pressDelay={0}
                useDragHandle={true}
                lockToContainerEdges={true}
                lockAxis={'y'}
                helperClass={'isDragging isDragging-slider'}
                lockOffset={'0%'}
            />
        );
    }
}

export default List;

List.propTypes = {
    updateSlider   : PropTypes.func,
    openRightPanel : PropTypes.func,
    deleteLine     : PropTypes.func,
    updateList     : PropTypes.func,
    orderSlider    : PropTypes.func,
    boxImage       : PropTypes.func,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};