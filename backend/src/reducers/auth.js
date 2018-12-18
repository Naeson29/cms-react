import {AUTH}           from '../actions/auth';
import AuthEntity       from '../models/entity/auth';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data : {
        success : false,
        error   : false,
        auth    : false,
        loading : true
    }
};

export default function User(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET' : {
            return INITIAL_STATE;
        }
        case AUTH.INIT: {
            return ReducerFunctions.getAuthInit(state);
        }
        case AUTH.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case AUTH.SUCCESS: {
            return ReducerFunctions.getAuthSuccess(state, action.payload, AuthEntity);
        }

        case AUTH.FAILURE: {
            return ReducerFunctions.getAuthFailure(state, action.payload);
        }

        default: {
            return state;
        }
    }
}