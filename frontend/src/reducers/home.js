import { GET_SLIDER} from '../actions/home';
import HomeEntity from '../models/entity/home';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
        content : [],
        loading : true,
        error   : false
    },
    slider: {
        content : [],
        loading : true,
        error   : false
    }
};

export default function Home(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SLIDER.INIT: {
            return ReducerFunctions.getInitSlider(state);
        }
        case GET_SLIDER.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_SLIDER.SUCCESS: {
            return ReducerFunctions.getSuccessSlider(state, action.payload, HomeEntity);
        }

        case GET_SLIDER.FAILURE: {
            return ReducerFunctions.getFailureSlider(state, action.payload);
        }
        default: {
            return state;
        }
    }
}
