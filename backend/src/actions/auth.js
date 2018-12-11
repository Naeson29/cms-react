import AuthApi from '../api/authApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const AUTH = ClassicConstantList('AUTH');

export let auth = new ClassicActions(AUTH, {
    action: () => {
        return AuthApi.auth();
    },
});