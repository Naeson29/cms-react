import {AUTH}          from '../actions/auth';
import AuthEntity       from '../models/entity/auth';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    loading : true,
    success : false,
    error   : false
};

export default function User(state = INITIAL_STATE, action) {
    switch (action.type) {
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