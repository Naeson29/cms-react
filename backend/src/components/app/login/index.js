import React, {Component} from 'react';
import {Button}           from 'reactstrap';
import PropTypes          from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            formErrors: {},
            parameters : {
                login    : '',
                password : ''
            }
        };

        this._handleChange = this._handleChange.bind(this);
        this._hasError     = this._hasError.bind(this);
        this._login        = this._login.bind(this);
    }

    _handleChange(attribute, value) {
        let newItem = {...this.state.parameters};
        newItem[attribute] = value;

        this.setState({parameters: {...newItem}, formErrors: {} });
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

    _hasError() {
        const {formErrors} = this.state;
        if(!Object.keys(formErrors).length){
            return;
        }
        return (
            <span className={'error'}>{'Utilisateur et/ou mot de passe incorrect(s)'}</span>
        );
    }

    _login(event){
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }
    }

    render() {
        const {login, password} = this.state.parameters;
        //const { loginUser, error } = this.props;

        return (
            <div className={'container-app-login'}>
                <div className={'form-login'}>
                    <h1>{'Se connecter'}</h1>
                    <form className={'forms'} onSubmit={this._login}>
                        <div className={'bloc-form'}>
                            <input id="login" name="login" type="text" autoFocus
                                className={'input'}
                                placeholder={'Identifiant'}
                                value={login}
                                onChange={(event) => this._handleChange('login', event.target.value)}
                            />
                        </div>
                        <div className={'bloc-form'}>
                            <input id="password" name="password" type="password"
                                className={'input'}
                                placeholder={'Mot de passe'}
                                value={password}
                                onChange={(event) => this._handleChange('password', event.target.value)}
                            />
                            {this._hasError()}
                        </div>
                        <div className={'submit-button'}>
                            <Button color={'primary'}>{'Connexion'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    error       : PropTypes.string,
    loading     : PropTypes.bool,
};

export default Login;
