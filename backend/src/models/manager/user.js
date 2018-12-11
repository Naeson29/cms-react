import {check} from '../../actions/user';
import Manager from './manager';

class User extends Manager {

    check(callback) {
        return this.classicDispatch(
            check.INIT,
            () => check.ACTION(),
            (content) => check.SUCCESS(content),
            (error) => check.FAILURE(error),
            callback
        );
    }
}

export default new User();

