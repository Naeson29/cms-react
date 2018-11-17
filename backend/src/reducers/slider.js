import { GET_SLIDER} from '../actions/slider';
import SliderEntity from '../models/entity/slider';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
        content : [],
        loading : true,
        error   : null
    }
};

export default function Slider(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SLIDER.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case GET_SLIDER.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_SLIDER.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, SliderEntity);
        }

        case GET_SLIDER.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }
        default: {
            return state;
        }
    }
}