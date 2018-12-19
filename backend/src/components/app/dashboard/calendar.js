import React, {Component} from 'react';
import BigCalendar        from 'react-big-calendar';
import withDragAndDrop    from 'react-big-calendar/lib/addons/dragAndDrop'
import moment             from 'moment';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import * as IconSolid     from '@fortawesome/free-solid-svg-icons/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import PropTypes from "prop-types";

const DraggableCalendar = withDragAndDrop(BigCalendar);

class Calendar extends Component {

    constructor(props){
        super(props);

        this.state = {
            view    : "month",
            content : props.content
        };

        this._view        = this._view.bind(this);
        this._onEventDrop = this._onEventDrop.bind(this);
    }

    _view(type){
        this.setState({
            view : type
        });
    }

    _onEventDrop(event){
        console.log(event)
        let content = this.state.content;
        const index = content.findIndex(data => data.id_event === event.event.id_event);
        content[index].start = event.start;
        content[index].end   = event.end;

        if(this.state.view !== 'month' && content[index].allDay === true){
            content[index].allDay = false;
            content[index].end    = moment(content[index].start).add(2, "hours");
        }

        if(event.isAllDay){
            content[index].allDay = true;
        }

        this.setState({content : content});

        let params = {
            start  : content[index].start,
            end    : content[index].end,
            allDay : content[index].allDay
        };

        this.props.updateEvent(event.event.id_event, params);
    }

    render() {
        moment.locale('fr');
        const locale = BigCalendar.momentLocalizer(moment);
        const {view, content} = this.state;

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
                    localizer={locale}
                    events={content}
                    view={view}
                    onView={(type) => {this._view(type)}}
                    startAccessor={(event) => { return new Date(event.start) }}
                    endAccessor={(event) => { return new Date(event.end) }}
                    defaultDate={new Date()}
                    messages={messages}
                    onEventDrop={this._onEventDrop}
                    onEventResize={this._onEventDrop}
                />
            </div>
        );
    }
}

export default Calendar;


Calendar.propTypes = {
    content     : PropTypes.array,
    updateEvent : PropTypes.func
};