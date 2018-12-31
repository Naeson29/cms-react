import { GET_EVENT, UPDATE_EVENT, DROP_EVENT, CREATE_EVENT, DELETE_EVENT} from '../actions/dashboard';
import DashboardEntity from '../models/entity/dashboard';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data : {},
    auth : true,
    view : {
        content : [],
        loading : true,
        error   : false
    }
};

export default function Dashboard(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET' : {
            return INITIAL_STATE;
        }
        case GET_EVENT.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case GET_EVENT.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_EVENT.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, DashboardEntity);
        }

        case GET_EVENT.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }
        case CREATE_EVENT.INIT: {
            return ReducerFunctions.createInit(state);
        }

        case CREATE_EVENT.ACTION: {
            return ReducerFunctions.createProcessed(state);
        }

        case CREATE_EVENT.SUCCESS: {
            return ReducerFunctions.createSuccess(action, state, action.payload);
        }

        case CREATE_EVENT.FAILURE: {
            return ReducerFunctions.createFailure(action, state, action.payload);
        }
        case UPDATE_EVENT.INIT: {
            return ReducerFunctions.updateInit(state);
        }

        case UPDATE_EVENT.ACTION: {
            return ReducerFunctions.updateProcessed(state);
        }

        case UPDATE_EVENT.SUCCESS: {
            return ReducerFunctions.updateSuccess(action, state, action.payload);
        }

        case UPDATE_EVENT.FAILURE: {
            return ReducerFunctions.updateFailure(action, state, action.payload);
        }
        case DROP_EVENT.INIT: {
            return ReducerFunctions.dropInit(state);
        }

        case DROP_EVENT.ACTION: {
            return ReducerFunctions.dropProcessed(state);
        }

        case DROP_EVENT.SUCCESS: {
            return ReducerFunctions.dropSuccess(action, state, action.payload);
        }

        case DROP_EVENT.FAILURE: {
            return ReducerFunctions.dropFailure(action, state, action.payload);
        }
        case DELETE_EVENT.INIT: {
            return ReducerFunctions.deleteInit(state);
        }

        case DELETE_EVENT.ACTION: {
            return ReducerFunctions.deleteProcessed(state);
        }

        case DELETE_EVENT.SUCCESS: {
            return ReducerFunctions.deleteSuccess(action, state, action.payload);
        }

        case DELETE_EVENT.FAILURE: {
            return ReducerFunctions.deleteFailure(action, state, action.payload);
        }

        default: {
            return state;
        }
    }
}
