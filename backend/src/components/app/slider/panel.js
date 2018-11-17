import React, { Component } from 'react';
import {Button} from 'reactstrap';
import serialize from 'form-serialize';
import PanelFunctions from '../../../containers/panel/functions';
import {connect} from 'react-redux';
import PanelActions from '../component/panelActions';
import PropTypes from 'prop-types';

class PanelCivility extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            parameters: props.civility ? props.civility : {
                label: '',
            },
            registerFormErrors: {},
            inputStarted: {},
            create: !props.civility,
        };

        this._checkForm = this._checkForm.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._updateCivility = this._updateCivility.bind(this);
        this._createCivility = this._createCivility.bind(this);
        this._hasError = this._hasError.bind(this);
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

    _updateCivility(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        const seri = serialize(document.getElementById('civilityForm'), {hash: true});

        this.setState({ displayErrors: false });
        this.props.updateCivility(this.state.parameters.id, seri, (data, success) => {
            if (success) {
                this.props.closePanel(this.props._id);
            }
        });
    }

    _createCivility(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        this.props.createCivility(serialize(document.getElementById('civilityForm'), {hash: true}), (data, success) => {
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
                        <form id="civilityForm" autoComplete="off" onSubmit={create ? this._createCivility : this._updateCivility} noValidate>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Abréviation :'}</label>
                                <input id="abbreviation" name="abbreviation" type="text" autoFocus required className="input"
                                    value={parameters.abbreviation}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange('abbreviation', event.target.value)}
                                />
                                {this._hasError('label') && <span className="error">{'Ce champs est requis'}</span>}
                            </div>
                            <div className="bloc-form">
                                <label className={'label-info'} htmlFor="label">{'Libellé :'}</label>
                                <input id="label" name="label" type="text" required className="input"
                                    value={parameters.label}
                                    onBlur={this._checkForm}
                                    onChange={(event) => this._handleChange('label', event.target.value)}
                                />
                                {this._hasError('label') && <span className="error">{'Ce champs est requis'}</span>}
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

PanelCivility.propTypes = {
    closePanel          : PropTypes.func.isRequired,
    _id                 : PropTypes.number.isRequired,
    createCivility      : PropTypes.func,
    updateCivility      : PropTypes.func,
    parameters                : PropTypes.object,
    civility       : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelCivility);