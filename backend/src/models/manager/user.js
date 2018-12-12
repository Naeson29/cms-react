import {getUser, createUser, updateUser, deleteUser} from '../../actions/user';
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

    create(parameters, callback) {
        return this.classicDispatch(
            createUser.INIT,
            () => createUser.ACTION(parameters),
            (content) => createUser.SUCCESS(content, parameters),
            (error) => createUser.FAILURE(error, parameters),
            callback
        );
    }

    update(userId, parameters, callback) {
        parameters.userId = userId;
        return this.classicDispatch(
            updateUser.INIT,
            () => updateUser.ACTION(parameters),
            (content) => updateUser.SUCCESS(content, parameters),
            (error) => updateUser.FAILURE(error, parameters),
            callback
        );
    }

    remove(userId, parameters, callback) {
        parameters.userId = userId;
        return this.classicDispatch(
            deleteUser.INIT,
            () => deleteUser.ACTION(parameters),
            (content) => deleteUser.SUCCESS(content, parameters),
            (error) => deleteUser.FAILURE(error, parameters),
            callback
        );
    }

}

export default new User();

