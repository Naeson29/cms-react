import { GET_SLIDER} from '../actions/home';
import HomeEntity from '../models/entity/home';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
};

export default function Home(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SLIDER.INIT: {
            return ReducerFunctions.getInit(state, 'list', action);
        }
        case GET_SLIDER.ACTION: {
            return ReducerFunctions.getProcessed(state, 'list', action);
        }

        case GET_SLIDER.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, 'list', HomeEntity, action);
        }

        case GET_SLIDER.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload, 'list', action);
        }
        default: {
            return state;
        }
    }
}
