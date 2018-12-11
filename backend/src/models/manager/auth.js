import {auth} from '../../actions/auth';
import Manager from './manager';

class Auth extends Manager {

    auth(callback) {
        return this.classicDispatch(
            auth.INIT,
            () => auth.ACTION(),
            (content) => auth.SUCCESS(content),
            (error) => auth.FAILURE(error),
            callback
        );
    }
}

export default new Auth();

