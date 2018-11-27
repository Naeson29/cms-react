import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {NOTIFICATION}       from "../../../utils/consts";

import {  TransitionGroup, CSSTransition } from 'react-transition-group';

class Notification extends Component {
    render() {
        const { type, attribute} = this.props;

        return (
            <TransitionGroup>
                <CSSTransition
                    key={`trans_${attribute}`}
                    classNames={'notification'}
                    appear={true}
                    timeout={300}>
                    <span className={`${type} notifications`}>
                        {NOTIFICATION[type][attribute]}
                    </span>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

Notification.propTypes = {
    type      : PropTypes.string,
    attribute : PropTypes.string,
};

export default Notification;
