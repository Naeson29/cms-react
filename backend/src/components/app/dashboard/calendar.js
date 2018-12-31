import React, {Component} from 'react';
import BigCalendar        from 'react-big-calendar';
import withDragAndDrop    from 'react-big-calendar/lib/addons/dragAndDrop';
import moment             from 'moment';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import * as IconSolid     from '@fortawesome/free-solid-svg-icons/index';
import PropTypes          from 'prop-types';
import {ACTIONS}          from '../../../utils/actions';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const DraggableCalendar = withDragAndDrop(BigCalendar);

class Calendar extends Component {

    constructor(props){
        super(props);

        this.state = {
            view    : 'month',
            content : props.content
        };

        this._view           = this._view.bind(this);
        this._onEventDrop    = this._onEventDrop.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.content !== prevProps.content) {
            this.setState({
                content: this.props.content
            });
        }
    }

    _view(type){
        this.setState({
            view : type
        });
    }

    _onEventDrop(event){
        let content = this.state.content;
        const index = content.findIndex(data => data.id_event === event.event.id_event);
        content[index].start  = event.start;
        content[index].end    = event.end;
        content[index].allDay = !!event.isAllDay;

        if(event.isAllDay){
            content[index].end = moment(content[index].start).add(2, 'hours');
        }

        this.setState({content : content});

        this.props.dropEvent(event.event.id_event, content[index]);
    }

    render() {
        moment.locale('fr');
        const locale = BigCalendar.momentLocalizer(moment);
        const {view, content} = this.state;
        const {openRightPanel, createEvent, updateEvent, updateCalendar, deleteEvent} = this.props;

        const messages = {
            month           : 'Mois',
            week            : 'Semaine',
            day             : 'Jour',
            today           : 'Aujourd\'hui',
            previous        : <FontAwesomeIcon icon={IconSolid.faChevronLeft} />,
            next            : <FontAwesomeIcon icon={IconSolid.faChevronRight} />,
            allDay          : 'Journée',
            time            : 'Créneau',
            event           : 'Evenement',
            noEventsInRange : 'Pas d\'evenements pour ces dates'
        };

        return (
            <div className={'calendar'}>
                <DraggableCalendar
                    selectable
                    localizer={locale}
                    events={content}
                    view={view}
                    onView={(type) => {this._view(type);}}
                    startAccessor={(event) => { return new Date(event.start); }}
                    endAccessor={(event) => { return new Date(event.end); }}
                    defaultDate={new Date()}
                    messages={messages}
                    onEventDrop={this._onEventDrop}
                    onEventResize={this._onEventDrop}
                    onSelectEvent={(event) => openRightPanel(ACTIONS.PANEL_EVENT, {
                        event          : event,
                        updateEvent    : updateEvent,
                        deleteEvent    : deleteEvent,
                        updateCalendar : updateCalendar
                    })}
                    onSelectSlot={(slot) => openRightPanel(ACTIONS.PANEL_EVENT, {
                        slot           : slot,
                        createEvent    : createEvent,
                        updateCalendar : updateCalendar
                    })}
                />
            </div>
        );
    }
}

export default Calendar;


Calendar.propTypes = {
    content        : PropTypes.array,
    createEvent    : PropTypes.func,
    updateEvent    : PropTypes.func,
    dropEvent      : PropTypes.func,
    openRightPanel : PropTypes.func,
    updateCalendar : PropTypes.func,
    deleteEvent    : PropTypes.func,
};