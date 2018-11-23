import React, { Component }     from 'react';
import {connect}                from 'react-redux';
import {Button}                 from 'reactstrap';
import serialize                from 'form-serialize';
import PanelFunctions           from '../../../containers/panel/functions';
import Config                   from '../../../configuration';
import PanelActions             from '../component/panelActions';
import FineUploaderTraditional  from 'fine-uploader-wrappers';
import Gallery                  from 'react-fine-uploader'
import PropTypes                from 'prop-types';

class PanelSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            registerFormErrors : {},
            create             : !props.slider,
            parameters         : props.slider ? props.slider : {
                label : '',
                text  : ''
            },
            messages           : {
                label : 'Le titre est requis',
                text  : 'Le texte est requis',
                image : 'L\'image est requise'
            }
        };

        this.uploader = new FineUploaderTraditional({
            options: {
                autoUpload : false,
                multiple   : false,
                chunking   : {
                    enabled : true
                },
                deleteFile : {
                    enabled : true,
                    endpoint: Config.get('api_url') + 'api/upload/'
                },
                request    : {
                    customHeaders : {
                        'Authorization' : 'Bearer ' + Config.get('api_token'),
                    },
                    endpoint: Config.get('api_url') + 'api/upload/'
                }
            }
        });

        this._checkForm    = this._checkForm.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._updateSlider = this._updateSlider.bind(this);
        this._createSlider = this._createSlider.bind(this);
        this._hasError     = this._hasError.bind(this);
    }

    _checkForm() {
        const parameters = this.state.parameters;
        let errors = {};

        Object.keys(parameters).map((key) => {
            if (!parameters[key]) {
                errors[key] = true;
            }
        });

        const image = this.uploader.methods.getUploads({
            status: this.uploader.qq.status.SUBMITTED
        }).length;

        if(image === 0){
            errors.image = true;
        }

        this.setState({ registerFormErrors: errors});
        return Object.keys(errors).length === 0;
    }

    _handleChange(attribute, value) {
        let newItem = {...this.state.parameters};
        newItem[attribute] = value;

        let errorList = this.state.registerFormErrors;
        if (errorList[attribute] !== undefined) {
            delete errorList[attribute];
        }

        this.setState({parameters: {...newItem}, registerFormErrors: {...errorList} });
    }

    _hasError(attribute) {
        if(!this.state.registerFormErrors[attribute]){
            return;
        }
        return (
            <span className="error">
                {this.state.messages[attribute]}
            </span>
        );
    }

    _updateSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        this.setState({ displayErrors: false });
        this.props.updateSlider(this.state.parameters.id, serialize(document.getElementById('sliderForm'), {hash: true}), (data, success) => {
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



        //uploader.methods.uploadStoredFiles()

        // this.props.createSlider(serialize(document.getElementById('sliderForm'), {hash: true}), (data, success) => {
        //     if (success) {
        //         this.props.closePanel(this.props._id);
        //     }
        // });
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
                                <input id="label" name="label" type="text" autoFocus required className={'input'}
                                    value={parameters.label}
                                    onChange={(event) => this._handleChange('label', event.target.value)}
                                />
                                {this._hasError('label')}
                            </div>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Texte :'}</label>
                                <textarea id="text" name="text" required className={'textarea'}
                                    value={parameters.text}
                                    onChange={(event) => this._handleChange('text', event.target.value)}
                                />
                                {this._hasError('text')}
                            </div>
                            <div className="bloc-form">
                                <Gallery uploader={this.uploader} />
                                {this._hasError('image')}
                            </div>
                            <PanelActions {...this.props}>
                                <Button color={'primary'}>{'Enregistrer'}</Button>
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