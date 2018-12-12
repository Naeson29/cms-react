import {GET_USER}       from '../actions/user';
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

        case GET_USER.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case GET_USER.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_USER.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, UserEntity);
        }

        case GET_USER.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }

        default: {
            return state;
        }
    }
}