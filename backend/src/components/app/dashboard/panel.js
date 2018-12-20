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

class PanelEvent extends Component
{
    constructor(props){
        super(props);

        this.default = {
            title : '',
            start : '',
            end   : ''
        };

        this.state = {
            formErrors    : {},
            create        : !props.event,
            parameters    : props.event ? props.event : this.default,
            reset         : false
        };

        this._checkForm     = this._checkForm.bind(this);
        this._hasError      = this._hasError.bind(this);
        this._handleChange  = this._handleChange.bind(this);
        this._createEvent   = this._createEvent.bind(this);
        this._updateEvent   = this._updateEvent.bind(this);
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
        let errors = {};

        // Object.keys(parameters).map((key) => {
        //     if (!parameters[key]) {
        //         errors[key] = NOTIFICATION.error[key];
        //     }
        // });

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

        return (
            <Notification content={formErrors}/>
        );
    }

    _createEvent(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        // this.props.createUser(serialize(this.form, {hash: true}), (data, success) => {
        //     if (success) {
        //         this._reset();
        //         this.props.closePanel(this.props._id);
        //         this.props.updateList();
        //     }
        //
        //     if(data.error && data.error !== 401){
        //         this._scrollTop();
        //     }
        // });
    }

    _updateEvent(event) {
        event.preventDefault();

        if (!this._checkForm()) {
            return;
        }

        const serialData = serialize(this.form, {hash: true});

        this.props.updateEvent(this.state.parameters.id_event, serialData, (data, success) => {
            if (success) {
                this._reset();
                this.props.closePanel(this.props._id);
                this.props.updateCalendar();
            }
            if(data.error && data.error !== 401){
                this._scrollTop();
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
                            name={'eventForm'}
                            autoComplete={'off'}
                            onSubmit={create ? this._createEvent : this._updateEvent}
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
                                <input id="title" name="title" type="text" autoFocus className={'input'}
                                    value={parameters.title}
                                    onChange={(event) => this._handleChange('title', event.target.value)}
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

PanelEvent.propTypes = {
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
    createEvent    : PropTypes.func,
    updateList     : PropTypes.func,
    updateEvent    : PropTypes.func,
    updateCalendar : PropTypes.func,
    event          : PropTypes.object,
};

export default connect(() => {return {};}, PanelFunctions)(PanelEvent);