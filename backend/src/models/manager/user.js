import {getUser} from '../../actions/user';
import Manager from './manager';

class User extends Manager {

    user(parameters, callback) {
        return this.classicDispatch(
            getUser.INIT,
            () => getUser.ACTION(parameters),
            (content) => getUser.SUCCESS(content, parameters),
            (error) => getUser.FAILURE(error, parameters),
            callback
        );
    }

}

export default new User();

