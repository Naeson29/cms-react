import {getEvent, updateEvent, dropEvent, createEvent, deleteEvent} from '../../actions/dashboard';
import Manager from './manager';

class Dashboard extends Manager {

    event(parameters, callback) {
        return this.classicDispatch(
            getEvent.INIT,
            () => getEvent.ACTION(parameters),
            (content) => getEvent.SUCCESS(content, parameters),
            (error) => getEvent.FAILURE(error, parameters),
            callback
        );
    }

    create(parameters, callback) {
        return this.classicDispatch(
            createEvent.INIT,
            () => createEvent.ACTION(parameters),
            (content) => createEvent.SUCCESS(content, parameters),
            (error) => createEvent.FAILURE(error, parameters),
            callback
        );
    }

    drop(eventId, parameters, callback) {
        parameters.eventId = eventId;
        return this.classicDispatch(
            dropEvent.INIT,
            () => dropEvent.ACTION(parameters),
            (content) => dropEvent.SUCCESS(content, parameters),
            (error) => dropEvent.FAILURE(error, parameters),
            callback
        );
    }

    update(eventId, parameters, callback) {
        parameters.eventId = eventId;
        return this.classicDispatch(
            updateEvent.INIT,
            () => updateEvent.ACTION(parameters),
            (content) => updateEvent.SUCCESS(content, parameters),
            (error) => updateEvent.FAILURE(error, parameters),
            callback
        );
    }

    remove(eventId, parameters, callback) {
        parameters.eventId = eventId;
        return this.classicDispatch(
            deleteEvent.INIT,
            () => deleteEvent.ACTION(parameters),
            (content) => deleteEvent.SUCCESS(content, parameters),
            (error) => deleteEvent.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Dashboard();

