import {getEvent, updateEvent} from '../../actions/dashboard';
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
}

export default new Dashboard();

