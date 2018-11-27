import React, { Component } from 'react';
import {Button}             from 'reactstrap';
import PanelActions         from '../component/panelActions';
import Notification         from '../panel/notification';
import PropTypes            from 'prop-types';
import serialize            from 'form-serialize';
import SubmitForm           from '../component/submitForm'

class Content extends Component {
    constructor(props){
        super(props);

        this.state = {
            formErrors : {},
            create     : !props.slider,
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

    _checkForm() {
        const parameters = this.state.parameters;
        let errors = {};

        Object.keys(parameters).map((key) => {
            if (!parameters[key]) {
                errors[key] = true;
            }
        });

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

        this.props.createSlider(serialize(document.getElementById('sliderForm'), {hash: true}), (data, success) => {
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

        console.log(this.props);

        return (
            <form
                id="sliderForm"
                autoComplete="off"
                onSubmit={create ? this._createSlider : this._updateSlider}
                noValidate
            >
                {
                    submit && (
                        <SubmitForm />
                    )
                }
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
                {
                    success && (
                        <div className="bloc-success">
                            <Notification type={'success'} attribute={'content'}/>
                        </div>
                    )
                }
                <PanelActions {...this.props}>
                    <Button color={'primary'}>{'Enregistrer'}</Button>
                </PanelActions>
            </form>
        )
    }
}

export default Content;

Content.propTypes = {
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