import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import PanelFunctions from '../../../containers/panel/functions';
import {ACTIONS} from '../../../utils/actions';

class Slider extends Component {
    constructor(props){
        super(props);
        props.load();
    }

    render() {
        const { content, openRightPanel, createSlider, updateSlider, loading } = this.props;

        return (
            <div className={'slider list'}>
                <h1>
                    <span>{'Slider'}</span>
                    <FontAwesomeIcon icon={IconSolid.faPlusCircle} onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                        createSlider : createSlider
                    } , {
                        onClose: (success) => {
                            if(success) {
                                //this.reload();
                            }
                        }
                    })} />
                </h1>
                <Table responsive striped className="tables">
                    <thead>
                        <tr>
                            <th>{'Ordre'}</th>
                            <th>{'Titre'}</th>
                            <th className={'no-display'}>{'Texte'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            content.map((slider, idx) => {
                                return (
                                    <tr key={idx} className={'clickable'} onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                                        slider       : slider,
                                        updateSlider : updateSlider
                                    })}>
                                        <td className={'center order'}>{slider.order}</td>
                                        <td>{slider.label}</td>
                                        <td className={'no-display'}>{slider.text}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Slider);

Slider.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    createSlider   : PropTypes.func,
    updateSlider   : PropTypes.func,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
