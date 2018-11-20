import React, { Component } from 'react';
import {Button} from 'reactstrap';
import serialize from 'form-serialize';
import PanelFunctions from '../../../containers/panel/functions';
import {connect} from 'react-redux';
import PanelActions from '../component/panelActions';
import PropTypes from 'prop-types';

class PanelSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            parameters: props.slider ? props.slider : {
                title       : '',
                description : ''
            },
            registerFormErrors: {},
            inputStarted: {},
            create: !props.slider,
        };

        this._checkForm    = this._checkForm.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._updateSlider = this._updateSlider.bind(this);
        this._createSlider = this._createSlider.bind(this);
        this._hasError     = this._hasError.bind(this);
    }

    _checkForm() {
        let errors = {};

        if (!this.state.parameters.label) {
            errors.label = 'invalid';
        }
        this.setState({ registerFormErrors: errors});
        return Object.keys(errors).length === 0;
    }

    _handleChange(attribute, value) {
        let newItem = {...this.state.parameters};
        newItem[attribute] = value;

        let newList = this.state.inputStarted;
        newList[attribute] = true;

        let errorList = this.state.registerFormErrors;
        if (errorList[attribute] !== undefined) {
            delete errorList[attribute];
        }

        this.setState({parameters: {...newItem}, inputStarted: {...newList}, registerFormErrors: {...errorList} });
    }

    _hasError(attribute) {
        return this.state.registerFormErrors[attribute] && this.state.inputStarted[attribute];
    }

    _updateSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        const seri = serialize(document.getElementById('civilityForm'), {hash: true});

        this.setState({ displayErrors: false });
        this.props.updateSlider(this.state.parameters.id, seri, (data, success) => {
            if (success) {
                this.props.closePanel(this.props._id);
            }
        });
    }

    _createSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        this.props.createSlider(serialize(document.getElementById('sliderForm'), {hash: true}), (data, success) => {
            if (success) {
                this.props.closePanel(this.props._id);
            }
        });
    }

    render() {
        const { create, parameters } = this.state;

        return (
            <div className="content-panel">
                <div className="content">
                    <div className="forms">
                        <form id="sliderForm" autoComplete="off" onSubmit={create ? this._createSlider : this._updateSlider} noValidate>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Titre :'}</label>
                                <input id="title" name="title" type="text" autoFocus required className={'input'}
                                    value={parameters.title}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange('title', event.target.value)}
                                />
                                {this._hasError('title') && <span className="error">{'Ce champs est requis'}</span>}
                            </div>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Description :'}</label>
                                <textarea id="description" name="description" required className={'textarea'}
                                    value={parameters.description}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange({'description': event.target.value})}
                                />
                                {this._hasError('description') && <span className="error">{'Ce champs est requis'}</span>}
                            </div>
                            <PanelActions {...this.props}>
                                <Button color={'primary'}>{create ? 'Créer' : 'Modifier'}</Button>
                            </PanelActions>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

PanelSlider.propTypes = {
    closePanel     : PropTypes.func.isRequired,
    _id            : PropTypes.number.isRequired,
    createSlider   : PropTypes.func,
    updateSlider   : PropTypes.func,
    parameters     : PropTypes.object,
    slider         : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelSlider);