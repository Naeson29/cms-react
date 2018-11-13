import { GET_SLIDER} from '../actions/home';
import HomeEntity from '../models/entity/home';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
        content : [],
        loading: true
    },
    slider: {
        content : [],
        loading: true
    }
};

export default function Home(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SLIDER.INIT: {
            return ReducerFunctions.getInit(state, action);
        }
        case GET_SLIDER.ACTION: {
            return ReducerFunctions.getProcessed(state, action);
        }

        case GET_SLIDER.SUCCESS: {
            return ReducerFunctions.getSuccessSlider(state, action.payload);
        }

        case GET_SLIDER.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload, action);
        }
        default: {
            return state;
        }
    }
}
