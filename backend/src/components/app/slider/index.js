import React, {Component}  from 'react';
import {connect}           from 'react-redux';
import { Table }           from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PanelFunctions      from '../../../containers/panel/functions';
import {ACTIONS}           from '../../../utils/actions';
import PropTypes           from 'prop-types';
import * as IconSolid      from '@fortawesome/free-solid-svg-icons';
import List                from './list';
import Loader              from '../component/loading';
import Lightbox            from 'react-images';
import Config              from "../../../configuration";

class Slider extends Component {
    constructor(props){
        super(props);

        props.closeAllPanel();
        props.load();

        this.state = {
            open         : false,
            currentImage : 0
        };

        this._updateList   = this._updateList.bind(this);
        this._delete       = this._delete.bind(this);
        this._orderSlider  = this._orderSlider.bind(this);
        this._boxImage     = this._boxImage.bind(this);
        this._closeBox     = this._closeBox.bind(this);
        this._navBox       = this._navBox.bind(this);
    }

    _updateList(){
        this.forceUpdate();
    }

    _boxImage(event, index){
        event.stopPropagation();
        this.setState({
            open         : true,
            currentImage : index
        });
    }

    _navBox(newCurrent){
        if(newCurrent >= this.props.content.length){
            newCurrent = 0;
        }
        if(newCurrent < 0){
            newCurrent = 0;
        }
        this.setState({
            currentImage : newCurrent
        });
    }

    _closeBox(){
        this.setState({
            open         : false,
            currentImage : 0
        });
    }

    _delete(event, sliderId){
        event.stopPropagation();
        this.props.deleteSlider(sliderId, () => {});
    }

    _orderSlider(items){
        this.props.orderSlider(items);
    }

    render() {
        const { content, logged, openRightPanel, createSlider, updateSlider, loading } = this.props;
        const url = Config.get('api_url') + 'static/slider/';

        if(loading){
            return (
                <Loader/>
            );
        }

        let images = [];
        content.map((key) =>{
            images.push({src :url + key.image});
        });

        return (
            <div className={'slider list'}>
                <h1>
                    <span>{'Slider'}</span>
                    <FontAwesomeIcon
                        icon={IconSolid.faPlusCircle}
                        onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                            createSlider : createSlider,
                            updateList   : this._updateList,
                            count        : (content.length + 1)
                        })}
                    />
                </h1>
                <Table responsive striped className="tables">
                    <thead>
                        <tr>
                            <th>{'Image'}</th>
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
                        boxImage={this._boxImage}
                        logged={logged}
                    />
                </Table>
                <Lightbox
                    images={images}
                    isOpen={this.state.open}
                    onClose={this._closeBox}
                    currentImage={this.state.currentImage}
                    onClickPrev={() => {this._navBox(this.state.currentImage - 1)}}
                    onClickNext={() => {this._navBox(this.state.currentImage + 1)}}
                    imageCountSeparator={'sur'}
                />
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Slider);

Slider.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    deleteSlider   : PropTypes.func.isRequired,
    orderSlider    : PropTypes.func.isRequired,
    createSlider   : PropTypes.func,
    updateSlider   : PropTypes.func,
    loading        : PropTypes.bool,
    logged         : PropTypes.number,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
