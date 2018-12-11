import {AUTH}          from '../actions/user';
import UserEntity       from '../models/entity/user';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data : {},
    view : {
        content : [],
        loading : true,
        error   : null
    },
    form : {
        loading : false,
        error   : null,
        success : false
    }
};

export default function User(state = INITIAL_STATE, action) {
    switch (action.type) {

        default: {
            return state;
        }
    }
}