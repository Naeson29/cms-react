import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PanelFunctions       from '../../../containers/panel/functions';
import PropTypes            from 'prop-types';
import Content              from './content';
import Upload               from './upload';

const CONTENT = 0;
const UPLOAD  = 1;

class PanelSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activeTab  : CONTENT,
        };
    }

    _renderBody() {
        switch(this.state.activeTab) {
            case CONTENT:
                return <Content {...this.props} />;
            case UPLOAD:
                return <Upload {...this.props} />;
            default:
                return null;
        }
    }

    render() {
        const {activeTab} = this.state;

        return (
            <div className="content-panel">
                <div className="content">
                    <ul className="nav nav-tabs">
                        <li className={activeTab === CONTENT ? 'active' : null} onClick={() => this.setState({activeTab: CONTENT})}>
                            {'Contenu'}
                        </li>
                        <li className={activeTab === UPLOAD ? 'active' : null} onClick={() => this.setState({activeTab: UPLOAD})}>
                            {'Image'}
                        </li>
                    </ul>
                    <div className="forms">
                        {this._renderBody()}
                    </div>
                </div>
            </div>
        );
    }
}

PanelSlider.propTypes = {
    closePanel     : PropTypes.func.isRequired,
    _id            : PropTypes.number.isRequired,
};

export default connect(() => {return {};}, PanelFunctions)(PanelSlider);