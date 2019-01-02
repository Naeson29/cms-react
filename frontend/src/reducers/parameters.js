import { GET_PARAMETERS} from '../actions/parameters';
import ParametersEntity from '../models/entity/parameters';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    parameters : {
        content : [],
        loading : false,
        error   : false
    }
};

export default function Parameters(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PARAMETERS.INIT: {
            return ReducerFunctions.getInitParameters(state);
        }
        case GET_PARAMETERS.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_PARAMETERS.SUCCESS: {
            return ReducerFunctions.getSuccessParameters(state, action.payload, ParametersEntity);
        }

        case GET_PARAMETERS.FAILURE: {
            return ReducerFunctions.getFailureParameters(state, action.payload);
        }
        default: {
            return state;
        }
    }
}
