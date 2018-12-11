import LoginApi from '../api/loginApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const LOGIN = ClassicConstantList('LOGIN');

export let login = new ClassicActions(LOGIN, {
    action: (parameters) => {
        return LoginApi.login(parameters);
    },
});

export let logout = () => {
    return LoginApi.logout();
};
