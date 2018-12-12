import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PanelFunctions       from '../../../containers/panel/functions';
import {Button}             from 'reactstrap';
import PanelActions         from '../component/panelActions';
import Notification         from '../panel/notification';
import PropTypes            from 'prop-types';
import SubmitForm           from '../component/submitForm';
import serialize            from 'form-serialize';

class PanelUser extends Component
{
    constructor(props)
    {
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
            formErrors : {},
            create     : !userProps,
            parameters : userProps ? userProps : this.default,
            reset     : false
        };

        this._checkForm    = this._checkForm.bind(this);
        this._hasError     = this._hasError.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._createUser   = this._createUser.bind(this);
        this._updateUser   = this._updateUser.bind(this);
        this._reset        = this._reset.bind(this);
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

    _reset(){
        this.setState({
            reset      : true,
            parameters : this.default
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

    _createUser(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        this.props.createUser(serialize(this.form, {hash: true}), (data, success) => {
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

        let serialData = serialize(this.form, {hash: true});

        if(!this.state.create && !serialData['password']){
            delete serialData['password'];
        }

        this.props.updateUser(this.state.parameters.id_user, serialData, (data, success) => {
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
            <div className="content-panel">
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
                                <label className={'label-info'} htmlFor="label">{'Nom :'}</label>
                                <input id="lastName" name="lastName" type="text" autoFocus className={'input'}
                                    value={parameters.lastName}
                                    onChange={(event) => this._handleChange('lastName', event.target.value)}
                                />
                                {this._hasError('lastName')}
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Prénom :'}</label>
                                <input id="firstName" name="firstName" type="text" className={'input'}
                                    value={parameters.firstName}
                                    onChange={(event) => this._handleChange('firstName', event.target.value)}
                                />
                                {this._hasError('firstName')}
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Email :'}</label>
                                <input id="email" name="email" type="text" className={'input'}
                                    value={parameters.email}
                                    onChange={(event) => this._handleChange('email', event.target.value)}
                                />
                                {this._hasError('email')}
                            </div>
                            <div className={'bloc-form'}>
                                <label className={'label-info'} htmlFor="label">{'Mot de passe :'}</label>
                                <input id="password" name="password" type="password" className={'input'}
                                       value={parameters.password}
                                       onChange={(event) => this._handleChange('password', event.target.value)}
                                />
                                {this._hasError('password')}
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
    createUser     : PropTypes.func,
    updateList     : PropTypes.func,
    updateUser     : PropTypes.func,
    user           : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelUser);