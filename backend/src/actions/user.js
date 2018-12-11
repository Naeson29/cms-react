import UserApi from '../api/userApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const AUTH = ClassicConstantList('AUTH');

export let auth = new ClassicActions(AUTH, {
    action: () => {
        return UserApi.auth();
    },
});