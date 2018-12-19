import {getEvent} from '../../actions/dashboard';
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
}

export default new Dashboard();

