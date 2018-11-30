import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import * as IconRegular from '@fortawesome/free-regular-svg-icons';
import PanelFunctions from '../../../containers/panel/functions';
import {ACTIONS} from '../../../utils/actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Slider extends Component {
    constructor(props){
        super(props);
        props.load();

        this._updateList = this._updateList.bind(this);
        this._delete     = this._delete.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _delete(event, sliderId){
        event.stopPropagation();

        this.props.deleteSlider(sliderId, (datum, success) => {});
    }

    onDragEnd = (result) => {
        console.log(result)
    };

    render() {
        const { content, openRightPanel, createSlider, updateSlider, loading } = this.props;

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
                            <th>{'Ordre'}</th>
                            <th>{'Titre'}</th>
                            <th className={'no-display'}>{'Texte'}</th>
                            <th />
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {
                                (provided, snapshot) => (
                                    <tbody ref={provided.innerRef}>
                                        {
                                            content.sort((a, b) => a.order > b.order).map((slider, idx) => {
                                                console.log(provided);
                                                return (
                                                    <Draggable key={slider.id} draggableId={slider.id} index={idx}>
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                                                                    slider       : slider,
                                                                    updateSlider : updateSlider,
                                                                    updateList   : this._updateList
                                                                })}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <td className={'center order'}>{slider.order}</td>
                                                                <td>{slider.label}</td>
                                                                <td className={'no-display'}>{slider.text}</td>
                                                                <td>
                                                                    <FontAwesomeIcon className={'delete'} icon={IconRegular.faTrashAlt} onClick={(e) => {this._delete(e,slider.id)}}/>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                )
                                            })
                                        }
                                    </tbody>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
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
