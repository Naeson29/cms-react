import {GET_USER, CREATE_USER, UPDATE_USER, DELETE_USER} from '../actions/user';
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

        case CREATE_USER.INIT: {
            return ReducerFunctions.createInit(state);
        }

        case CREATE_USER.ACTION: {
            return ReducerFunctions.createProcessed(state);
        }

        case CREATE_USER.SUCCESS: {
            return ReducerFunctions.createSuccess(action, state, action.payload);
        }

        case CREATE_USER.FAILURE: {
            return ReducerFunctions.createFailure(action, state, action.payload);
        }

        case UPDATE_USER.INIT: {
            return ReducerFunctions.updateInit(state);
        }

        case UPDATE_USER.ACTION: {
            return ReducerFunctions.updateProcessed(state);
        }

        case UPDATE_USER.SUCCESS: {
            return ReducerFunctions.updateSuccess(action, state, action.payload);
        }

        case UPDATE_USER.FAILURE: {
            return ReducerFunctions.updateFailure(action, state, action.payload);
        }

        case DELETE_USER.INIT: {
            return ReducerFunctions.deleteInit(state);
        }

        case DELETE_USER.ACTION: {
            return ReducerFunctions.deleteProcessed(state);
        }

        case DELETE_USER.SUCCESS: {
            return ReducerFunctions.deleteSuccess(action, state, action.payload);
        }

        case DELETE_USER.FAILURE: {
            return ReducerFunctions.deleteFailure(action, state, action.payload);
        }

        default: {
            return state;
        }
    }
}