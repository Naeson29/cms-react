import { GET_EVENT} from '../actions/dashboard';
import DashboardEntity from '../models/entity/dashboard';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
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
        default: {
            return state;
        }
    }
}
