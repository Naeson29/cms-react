import React, { Component } from 'react';
import PanelFunctions from '../../../containers/panel/functions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';


class Panel extends Component {
    render() {
        return (
            <div className={'panel'}>
                <div className={'action close-panel ' + this.props.position}>
                    <span>{this.props.title}</span>
                    <FontAwesomeIcon
                        icon={IconSolid.faTimesCircle}
                        onClick={() => this.props.closePanel(this.props.id, false)}
                    />
                </div>
                {this.props.children}
            </div>
        );
    }
}

Panel.propTypes = {
    title: PropTypes.string,
    closePanel: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
};

export default connect(() => {return {};}, PanelFunctions)(Panel);
