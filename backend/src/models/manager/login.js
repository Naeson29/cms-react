import {login} from '../../actions/login';
import Manager from './manager';

class Login extends Manager {

    login(parameters, callback) {
        return this.classicDispatch(
            login.INIT,
            () => login.ACTION(parameters),
            (content) => login.SUCCESS(content, parameters),
            (error) => login.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Login();

