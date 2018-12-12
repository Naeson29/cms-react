import UserApi from '../api/userApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_USER  = ClassicConstantList('GET_USER');

export let getUser = new ClassicActions(GET_USER, {
    action: (parameters) => {
        return UserApi.getUser(parameters);
    },
});