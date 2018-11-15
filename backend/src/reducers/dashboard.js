import { GET_SLIDER} from '../actions/dashboard';
import DashboardEntity from '../models/entity/dashboard';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
    view: {
        content : [],
        loading : true,
        error   : null
    },
    slider: {
        content : [],
        loading : true,
        error   : null
    }
};

export default function Dashboard(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SLIDER.INIT: {
            return ReducerFunctions.getInitSlider(state);
        }
        case GET_SLIDER.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case GET_SLIDER.SUCCESS: {
            return ReducerFunctions.getSuccessSlider(state, action.payload, DashboardEntity);
        }

        case GET_SLIDER.FAILURE: {
            return ReducerFunctions.getFailureSlider(state, action.payload);
        }
        default: {
            return state;
        }
    }
}
