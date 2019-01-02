import { GET_NEWS} from '../actions/news';
import NewsEntity from '../models/entity/news';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
        content : [],
        loading : true,
        error   : false
    }
};

export default function Home(state = INITIAL_STATE, action) {
    switch (action.type) {
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
        default: {
            return state;
        }
    }
}
