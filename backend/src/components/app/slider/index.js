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
        const { content, openRightPanel, createSlider, loading } = this.props;

        console.log(this.props)

        return (
            <div className={'slider list'}>
                <h1>
                    <span>{'Slider'}</span>
                    <FontAwesomeIcon icon={IconSolid.faPlusCircle} onClick={() => openRightPanel(ACTIONS.PANEL_SLIDER, {
                        createCivility: createSlider
                    } , {
                        onClose: (success) => {
                            if(success) {
                                this.reload();
                            }
                        }
                    })} />
                </h1>
                <Table responsive striped className="tables">
                    <thead>
                    <tr>
                        <th>{'Ordre'}</th>
                        <th>{'Titre'}</th>
                        <th>{'Texte'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        content.map((slider, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className={'center order'}>{slider.order}</td>
                                    <td>{slider.label}</td>
                                    <td>{slider.text}</td>
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
    load         : PropTypes.func.isRequired,
    createSlider : PropTypes.func.isRequired,
    loading      : PropTypes.bool,
    content      : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
