import {GET_PARAMETERS, UPDATE_PARAMETERS} from '../actions/parameters';
import ParametersEntity from '../models/entity/parameters';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data : {},
    auth : true,
    view : {
        content : [],
        logged  : null,
        loading : true,
        error   : false,
    },
    form : {
        loading : false,
        error   : false,
        success : false
    }
};

export default function Parameters(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET' : {
            return INITIAL_STATE;
        }
        case GET_PARAMETERS.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case GET_PARAMETERS.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_PARAMETERS.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, ParametersEntity);
        }

        case GET_PARAMETERS.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }

        case UPDATE_PARAMETERS.INIT: {
            return ReducerFunctions.updateInit(state);
        }

        case UPDATE_PARAMETERS.ACTION: {
            return ReducerFunctions.updateProcessed(state);
        }

        case UPDATE_PARAMETERS.SUCCESS: {
            return ReducerFunctions.updateSuccess(action, state, action.payload);
        }

        case UPDATE_PARAMETERS.FAILURE: {
            return ReducerFunctions.updateFailure(action, state, action.payload);
        }

        default: {
            return state;
        }
    }
}