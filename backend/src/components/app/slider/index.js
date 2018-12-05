import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import PanelFunctions from '../../../containers/panel/functions';
import {ACTIONS} from '../../../utils/actions';
import List from './list';

class Slider extends Component {
    constructor(props){
        super(props);
        props.load();

        this._updateList   = this._updateList.bind(this);
        this._delete       = this._delete.bind(this);
        this._orderSlider  = this._orderSlider.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _delete(event, sliderId){
        event.stopPropagation();

        this.props.deleteSlider(sliderId, () => {});
    }

    _orderSlider(items){
        this.props.orderSlider(items);
    }

    render() {
        const { content, openRightPanel, createSlider, updateSlider, loading } = this.props;

        if(loading){
            return (
                <div/>
            );
        }

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
                    <List
                        content={content}
                        updateSlider={updateSlider}
                        openRightPanel={openRightPanel}
                        deleteLine={this._delete}
                        updateList={this._updateList}
                        orderSlider={this._orderSlider}
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
