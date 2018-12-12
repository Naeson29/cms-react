import UserApi from '../api/userApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_USER     = ClassicConstantList('GET_USER');
export const CREATE_USER  = ClassicConstantList('CREATE_USER');
export const UPDATE_USER  = ClassicConstantList('UPDATE_USER');
export const DELETE_USER  = ClassicConstantList('DELETE_USER');

export let getUser = new ClassicActions(GET_USER, {
    action: (parameters) => {
        return UserApi.getUser(parameters);
    },
});

export let createUser = new ClassicActions(CREATE_USER, {
    action: (parameters) => {
        return UserApi.createUser(parameters);
    },
});

export let updateUser = new ClassicActions(UPDATE_USER, {
    action: (parameters) => {
        if (!parameters.userId) {
            console.error('Invalid userId');
            return {};
        }
        return UserApi.updateUser(parameters.userId, parameters);
    },
});

export let deleteUser = new ClassicActions(DELETE_USER, {
    action: (parameters) => {
        if (!parameters.userId) {
            console.error('Invalid userId');
            return {};
        }
        return UserApi.deleteUser(parameters.userId, parameters);
    },
});
