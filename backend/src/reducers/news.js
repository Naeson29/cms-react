import { GET_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS} from '../actions/news';
import NewsEntity     from '../models/entity/news';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data : {},
    auth : true,
    view : {
        content : [],
        loading : true,
        error   : false
    },
    form : {
        loading : false,
        error   : false,
        success : false
    }
};

export default function News(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET' : {
            return INITIAL_STATE;
        }
        case GET_NEWS.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case GET_NEWS.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_NEWS.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, NewsEntity);
        }

        case GET_NEWS.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }
        case CREATE_NEWS.INIT: {
            return ReducerFunctions.createInit(state);
        }

        case CREATE_NEWS.ACTION: {
            return ReducerFunctions.createProcessed(state);
        }

        case CREATE_NEWS.SUCCESS: {
            return ReducerFunctions.createSuccess(action, state, action.payload);
        }

        case CREATE_NEWS.FAILURE: {
            return ReducerFunctions.createFailure(action, state, action.payload);
        }

        case UPDATE_NEWS.INIT: {
            return ReducerFunctions.updateInit(state);
        }

        case UPDATE_NEWS.ACTION: {
            return ReducerFunctions.updateProcessed(state);
        }

        case UPDATE_NEWS.SUCCESS: {
            return ReducerFunctions.updateSuccess(action, state, action.payload);
        }

        case UPDATE_NEWS.FAILURE: {
            return ReducerFunctions.updateFailure(action, state, action.payload);
        }

        case DELETE_NEWS.INIT: {
            return ReducerFunctions.deleteInit(state);
        }

        case DELETE_NEWS.ACTION: {
            return ReducerFunctions.deleteProcessed(state);
        }

        case DELETE_NEWS.SUCCESS: {
            return ReducerFunctions.deleteSuccess(action, state, action.payload);
        }

        case DELETE_NEWS.FAILURE: {
            return ReducerFunctions.deleteFailure(action, state, action.payload);
        }

        default: {
            return state;
        }
    }
}
