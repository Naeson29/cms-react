import {auth} from '../../actions/user';
import Manager from './manager';

class User extends Manager {

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

export default new User();

