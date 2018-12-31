import React, {Component}  from 'react';
import {connect}           from 'react-redux';
import PropTypes           from 'prop-types';
import Loader              from '../component/loading';
import Calendar            from './calendar';
import PanelFunctions      from '../../../containers/panel/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid      from '@fortawesome/free-solid-svg-icons/index';
import {ACTIONS}           from '../../../utils/actions';

class Dashboard extends Component {

    constructor(props){
        super(props);
        props.load();

        this._updateCalendar = this._updateCalendar.bind(this);
    }

    _updateCalendar(){
        this.forceUpdate();
    }

    render() {
        const {content, loading, createEvent, updateEvent,dropEvent, openRightPanel, deleteEvent} = this.props;

        return (
            <div className={'dashboard'}>
                <h1>
                    <span>{'Tableau de bord'}</span>
                    {
                        !loading &&
                        <FontAwesomeIcon
                            icon={IconSolid.faPlusCircle}
                            onClick={() => openRightPanel(ACTIONS.PANEL_EVENT, {
                                createEvent    : createEvent,
                                updateCalendar : this._updateCalendar,
                            })}
                        />
                    }
                </h1>
                {
                    loading ? <Loader/> :
                        <Calendar
                            content={content}
                            dropEvent={dropEvent}
                            updateEvent={updateEvent}
                            deleteEvent={deleteEvent}
                            openRightPanel={openRightPanel}
                            updateCalendar={this._updateCalendar}
                        />
                }
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Dashboard);

Dashboard.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    createEvent    : PropTypes.func,
    deleteEvent    : PropTypes.func,
    dropEvent      : PropTypes.func,
    updateEvent    : PropTypes.func,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    error          : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ])
};
