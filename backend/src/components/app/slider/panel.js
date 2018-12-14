import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PanelFunctions       from '../../../containers/panel/functions';
import {Button}             from 'reactstrap';
import PanelActions         from '../component/panelActions';
import Notification         from '../panel/notification';
import PropTypes            from 'prop-types';
import SubmitForm           from '../component/submitForm';
import ImageUploader        from 'react-images-upload';

import {SIZE_IMAGE, EXTENSION_IMAGE, UPLOAD_IMAGE, UPLOAD_LABEL, NOTIFICATION} from '../../../utils/consts';

class PanelSlider extends Component
{
    constructor(props){
        super(props);

        this.default = {
            label : '',
            text  : ''
        };

        this.state = {
            formErrors : {},
            create     : !props.slider,
            image      : [],
            parameters : props.slider ? props.slider : this.default,
            reset     : false
        };

        this._checkForm    = this._checkForm.bind(this);
        this._hasError     = this._hasError.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._createSlider = this._createSlider.bind(this);
        this._updateSlider = this._updateSlider.bind(this);
        this._onDrop       = this._onDrop.bind(this);
        this._reset        = this._reset.bind(this);
        this._scrollTop    = this._scrollTop.bind(this);
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

    _reset(){
        this.setState({
            reset      : true,
            parameters : this.default
        });
    }

    _scrollTop(){
        this.content.scrollTo({
            top      : 0,
            behavior : 'smooth'
        });
    }

    _checkForm() {
        const parameters = this.state.parameters;
        const create     = this.state.create;
        const image      = this.state.image.length;
        let errors = {};

        Object.keys(parameters).map((key) => {
            if (!parameters[key]) {
                errors[key] = NOTIFICATION.error[key];
            }
            if(!image && create){
                errors.image = NOTIFICATION.error.image;
            }
        });

        this.setState({formErrors: errors});

        if(Object.keys(errors).length){
            this._scrollTop();
        }

        return Object.keys(errors).length === 0;
    }

    _hasError() {
        const formErrors = this.state.formErrors;

        if(!Object.keys(formErrors).length){
            return;
        }

        return (
            <Notification content={formErrors}/>
        );
    }

    _createSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }
        const data = new FormData(this.form);

        this.props.createSlider(data, (data, success) => {
            this._scrollTop();

            if (success) {
                this._reset();
                this.props.closePanel(this.props._id);
                this.props.updateList();
            }
        });
    }

    _updateSlider(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }
        const data = new FormData(this.form);

        this.props.updateSlider(this.state.parameters.id_slider, data, (data, success) => {
            this._scrollTop();

            if (success) {
                this._reset();
                this.props.closePanel(this.props._id);
                this.props.updateList();
            }
        });
    }

    render(){
        const { submit, count }    = this.props;
        const { create, parameters } = this.state;
        const key = !this.state.reset ? 'form_edit' : 'form_clean';

        return (
            <div className="content-panel" ref={(el) => { this.content = el; }}>
                <div className="content">
                    <div className={'forms'}>
                        <form
                            key={key}
                            name={'sliderForm'}
                            autoComplete={'off'}
                            onSubmit={create ? this._createSlider : this._updateSlider}
                            encType={'multipart/form-data'}
                            ref={(el) => this.form = el}
                        >
                            {
                                submit && (
                                    <SubmitForm />
                                )
                            }
                            <div className={'bloc-form'}>
                                {this._hasError()}
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Titre :'}</label>
                                <input id="label" name="label" type="text" autoFocus className={'input'}
                                    value={parameters.label}
                                    onChange={(event) => this._handleChange('label', event.target.value)}
                                />
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Texte :'}</label>
                                <textarea id="text" name="text" className={'textarea'}
                                    value={parameters.text}
                                    onChange={(event) => this._handleChange('text', event.target.value)}
                                />
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
                            </div>
                            {
                                create &&
                                    <input type={'hidden'} value={count} id={'count'} name={'count'} />
                            }
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
    create         : PropTypes.bool,
    submit         : PropTypes.bool,
    success        : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    createSlider   : PropTypes.func,
    updateList     : PropTypes.func,
    updateSlider   : PropTypes.func,
    slider         : PropTypes.object,
    count          : PropTypes.number,
};

export default connect(() => {return {};}, PanelFunctions)(PanelSlider);