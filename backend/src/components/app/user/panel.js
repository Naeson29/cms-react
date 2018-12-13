import React, { Component }  from 'react';
import {connect}             from 'react-redux';
import PanelFunctions        from '../../../containers/panel/functions';
import {Button}              from 'reactstrap';
import PanelActions          from '../component/panelActions';
import Notification          from '../panel/notification';
import PropTypes             from 'prop-types';
import SubmitForm            from '../component/submitForm';
import serialize             from 'form-serialize';
import {NOTIFICATION}        from '../../../utils/consts';
import ReactPasswordStrength from 'react-password-strength';
import * as EmailValidator   from 'email-validator';

class PanelUser extends Component
{
    constructor(props){
        super(props);

        this.default = {
            firstName : '',
            lastName  : '',
            email     : '',
            password  : ''
        };

        const userProps = props.user;

        if(props.user){
            userProps.password = '';
        }

        this.state = {
            formErrors    : {},
            passwordValid : !!userProps,
            create        : !userProps,
            parameters    : userProps ? userProps : this.default,
            reset         : false
        };

        this._checkForm     = this._checkForm.bind(this);
        this._hasError      = this._hasError.bind(this);
        this._handleChange  = this._handleChange.bind(this);
        this._passwordValid = this._passwordValid.bind(this);
        this._createUser    = this._createUser.bind(this);
        this._updateUser    = this._updateUser.bind(this);
        this._reset         = this._reset.bind(this);
        this._scrollTop     = this._scrollTop.bind(this);
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

    _passwordValid(value, isValid){
        if(!this.state.create && !value){
            isValid = true;
        }

        this.setState({
            passwordValid : isValid
        })
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
            behavior : "smooth"
        });
    }

    _checkForm() {
        const parameters = this.state.parameters;
        let errors = {};

        if(!this.state.create){
            delete parameters.password;
        }

        Object.keys(parameters).map((key) => {
            if (!parameters[key]) {
                errors[key] = NOTIFICATION.error[key];
            }
        });

        if(!this.state.passwordValid){
            errors.password = NOTIFICATION.error.password;
        }

        if(parameters.email && !EmailValidator.validate(parameters.email)){
            errors.emailType = NOTIFICATION.error.emailType;
        }

        this.setState({formErrors: errors});

        if(Object.keys(errors).length){
            this._scrollTop();
        }

        return Object.keys(errors).length === 0;
    }

    _hasError() {
        const formErrors = this.state.formErrors;
        const error      = this.props.error;

        if(!Object.keys(formErrors).length && !error){
            return;
        }

        if(error){
            formErrors[error.code] = NOTIFICATION.code[error.code]
        }

        return (
            <Notification content={formErrors}/>
        );
    }

    _createUser(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        this.props.createUser(serialize(this.form, {hash: true}), (data, success) => {
            this._scrollTop();

            if (success) {
                this._reset();
                this.props.closePanel(this.props._id);
                this.props.updateList();
            }
        });
    }

    _updateUser(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        const serialData = serialize(this.form, {hash: true});

        if(!this.state.create && !serialData['password']){
            delete serialData['password'];
        }

        this.props.updateUser(this.state.parameters.id_user, serialData, (data, success) => {
            this._scrollTop();

            if (success) {
                this._reset();
                this.props.closePanel(this.props._id);
                this.props.updateList();
            }
        });
    }

    render(){
        const { submit }    = this.props;
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
                            onSubmit={create ? this._createUser : this._updateUser}
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
                                <label className={'label-info'} htmlFor="label">{'Nom :'}</label>
                                <input id="lastName" name="lastName" type="text" autoFocus className={'input'}
                                    value={parameters.lastName}
                                    onChange={(event) => this._handleChange('lastName', event.target.value)}
                                />
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Prénom :'}</label>
                                <input id="firstName" name="firstName" type="text" className={'input'}
                                    value={parameters.firstName}
                                    onChange={(event) => this._handleChange('firstName', event.target.value)}
                                />
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Email :'}</label>
                                <input id="email" name="email" type="text" className={'input'}
                                    value={parameters.email}
                                    onChange={(event) => this._handleChange('email', event.target.value)}
                                />
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Mot de passe :'}</label>
                                <ReactPasswordStrength
                                    className={'password-strength'}
                                    minLength={6}
                                    minScore={1}
                                    tooShortWord={'Trop court'}
                                    scoreWords={['Faible', 'Moyen', 'Bon', 'Fort', 'Très fort']}
                                    changeCallback={(value) => {
                                        this._handleChange('password', value.password);
                                        this._passwordValid(value.password, value.isValid);
                                    }}
                                    inputProps={{ name: "password", autoComplete: "off", className: "password" }}
                                />
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

PanelUser.propTypes = {
    closePanel     : PropTypes.func.isRequired,
    _id            : PropTypes.number.isRequired,
    create         : PropTypes.bool,
    submit         : PropTypes.bool,
    success        : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    error          : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    createUser     : PropTypes.func,
    updateList     : PropTypes.func,
    updateUser     : PropTypes.func,
    user           : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelUser);