import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PanelFunctions       from '../../../containers/panel/functions';
import {Button}             from 'reactstrap';
import PanelActions         from '../component/panelActions';
import Notification         from '../panel/notification';
import PropTypes            from 'prop-types';
import SubmitForm           from '../component/submitForm';
import ImageUploader        from 'react-images-upload';

import {SIZE_IMAGE, EXTENSION_IMAGE, UPLOAD_IMAGE, UPLOAD_LABEL, NOTIFICATION} from '../../../utils/consts'

class PanelSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            formErrors : {},
            create     : !props.slider,
            image      : [],
            parameters : props.slider ? props.slider : {
                label : '',
                text  : ''
            }
        };

        this._checkForm    = this._checkForm.bind(this);
        this._hasError     = this._hasError.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._createSlider = this._createSlider.bind(this);
        this._updateSlider = this._updateSlider.bind(this);
        this._onDrop       = this._onDrop.bind(this);
    }

    _handleChange(attribute, value) {
        let newItem = {...this.state.parameters};
        newItem[attribute] = value;

        let errorList = this.state.formErrors;
        if (errorList[attribute] !== undefined) {
            delete errorList[attribute];
        }

        this.setState({parameters: {...newItem}, formErrors: {...errorList} });
    }

    _onDrop(picture) {
        let errors = this.state.formErrors;
        delete errors.image;

        this.setState({
            formErrors : errors,
            image      : picture
        });
    }

    _checkForm() {
        const parameters = this.state.parameters;
        let errors = {};

        Object.keys(parameters).map((key) => {
            if (!parameters[key]) {
                errors[key] = true;
            }
        });

        if(this.state.image.length === 0){
            errors.image = true;
        }

        this.setState({formErrors: errors});
        return Object.keys(errors).length === 0;
    }

    _hasError(attribute) {
        if(!this.state.formErrors[attribute]){
            return;
        }
        return (
            <Notification type={'error'} attribute={attribute}/>
        );
    }

    _createSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        const form = document.getElementById('sliderForm');
        const data = new FormData(form);

        this.props.createSlider(data, (data, success) => {
            if (success) {
                //this.props.closePanel(this.props._id);
            }
        });
    }

    _updateSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        // this.setState({ displayErrors: false });
        // this.props.updateSlider(this.state.parameters.id, serialize(document.getElementById('sliderForm'), {hash: true}), (data, success) => {
        //     if (success) {
        //         this.props.closePanel(this.props._id);
        //     }
        // });
    }

    render(){
        const { submit, success }    = this.props;
        const { create, parameters } = this.state;

        return (
            <div className="content-panel">
                <div className="content">
                    <div className={'forms'}>
                        <form
                            id={'sliderForm'}
                            name={'sliderForm'}
                            autoComplete={'off'}
                            onSubmit={create ? this._createSlider : this._updateSlider}
                            encType={'multipart/form-data'}
                            noValidate
                        >
                            {
                                submit && (
                                    <SubmitForm />
                                )
                            }
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Titre :'}</label>
                                <input id="label" name="label" type="text" autoFocus required className={'input'}
                                       value={parameters.label}
                                       onChange={(event) => this._handleChange('label', event.target.value)}
                                />
                                {this._hasError('label')}
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Texte :'}</label>
                                <textarea id="text" name="text" required className={'textarea'}
                                          value={parameters.text}
                                          onChange={(event) => this._handleChange('text', event.target.value)}
                                />
                                {this._hasError('text')}
                            </div>
                            <div className={'bloc-form'}>
                                <ImageUploader
                                    name={'slider'}
                                    buttonClassName={'btn'}
                                    onChange={this._onDrop}
                                    label={UPLOAD_LABEL}
                                    buttonText={UPLOAD_IMAGE}
                                    imgExtension={EXTENSION_IMAGE}
                                    maxFileSize={SIZE_IMAGE}
                                    fileTypeError={NOTIFICATION.error.extension}
                                    fileSizeError={NOTIFICATION.error.size}
                                    withIcon={true}
                                    withPreview={true}
                                    singleImage={true}
                                />
                                {this._hasError('image')}
                            </div>
                            {
                                success && (
                                    <div className={'bloc-success'}>
                                        <Notification type={'success'} attribute={'content'}/>
                                    </div>
                                )
                            }
                            <PanelActions {...this.props}>
                                <Button color={'primary'}>{'Enregistrer'}</Button>
                            </PanelActions>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

PanelSlider.propTypes = {
    closePanel     : PropTypes.func.isRequired,
    _id            : PropTypes.number.isRequired,
    create         : PropTypes.bool,
    submit         : PropTypes.bool,
    success        : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    createSlider   : PropTypes.func,
    updateSlider   : PropTypes.func,
    slider         : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelSlider);