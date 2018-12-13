import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {  TransitionGroup, CSSTransition } from 'react-transition-group';

class Notification extends Component {
    render() {
        const {content} = this.props;

        return (
            <TransitionGroup>
                <CSSTransition
                    key={`trans_notification`}
                    classNames={'notification'}
                    appear={true}
                    timeout={300}>
                    <div className={'error notifications'}>
                        <div className={'bloc-notification'}>
                            {
                                Object.keys(content).map((key, index) => {
                                    return (
                                        <p key={'error_' + index}>
                                            {`* ${content[key]}`}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

Notification.propTypes = {
    content : PropTypes.object,
};

export default Notification;
