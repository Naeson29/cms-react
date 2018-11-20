import React, { Component }     from 'react';
import {Button}                 from 'reactstrap';
import serialize                from 'form-serialize';
import PanelFunctions           from '../../../containers/panel/functions';
import {connect}                from 'react-redux';
import PanelActions             from '../component/panelActions';
import FineUploaderTraditional  from 'fine-uploader-wrappers'
import Gallery                  from 'react-fine-uploader'
import PropTypes                from 'prop-types';

class PanelSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            registerFormErrors : {},
            inputStarted       : {},
            create             : !props.slider,
            parameters         : props.slider ? props.slider : {
                label : '',
                text  : ''
            }
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

        this.setState({ displayErrors: false });
        this.props.updateSlider(this.state.parameters.id, serialize(document.getElementById('civilityForm'), {hash: true}), (data, success) => {
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

        const uploader = new FineUploaderTraditional({
            options: {
                chunking: {
                    enabled: true
                },
                deleteFile: {
                    enabled: true,
                    endpoint: '/uploads'
                },
                request: {
                    endpoint: '/uploads'
                },
                retry: {
                    enableAuto: true
                }
            }
        });

        return (
            <div className="content-panel">
                <div className="content">
                    <div className="forms">
                        <form id="sliderForm" autoComplete="off" onSubmit={create ? this._createSlider : this._updateSlider} noValidate>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Titre :'}</label>
                                <input id="label" name="label" type="text" autoFocus required className={'input'}
                                    value={parameters.label}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange('label', event.target.value)}
                                />
                                {this._hasError('label') && <span className="error">{'Le titre du slider est requis'}</span>}
                            </div>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Texte :'}</label>
                                <textarea id="text" name="text" required className={'textarea'}
                                    value={parameters.text}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange('text', event.target.value)}
                                />
                                {this._hasError('text') && <span className="error">{'La texte du slider est requis'}</span>}
                            </div>
                            <div className="bloc-form">
                                <Gallery uploader={ uploader } />
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