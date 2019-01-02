import {getParameters} from '../../actions/parameters';
import Manager from './manager';

class Parameters extends Manager {

    parameters(parameters, callback) {
        return this.classicDispatch(
            getParameters.INIT,
            () => getParameters.ACTION(parameters),
            (content) => getParameters.SUCCESS(content, parameters),
            (error) => getParameters.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Parameters();

