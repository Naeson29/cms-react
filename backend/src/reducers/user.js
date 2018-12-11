import {AUTH}          from '../actions/user';
import UserEntity       from '../models/entity/user';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    view : {
        loading : true
    }
};

export default function User(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case AUTH.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case AUTH.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, UserEntity);
        }

        case AUTH.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }

        default: {
            return state;
        }
    }
}