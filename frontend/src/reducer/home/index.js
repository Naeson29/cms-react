// import {
//     GET_CIVILITIES, UPDATE_CIVILITY, CREATE_CIVILITY,
// } from '../actions/civility/civility';
import HomeEntity from '../../models/entity/home';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    data: {},
};

export default function Civility(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case GET_CIVILITIES.INIT: {
        //     return ReducerFunctions.getInit(state, 'list', action);
        // }
        // case GET_CIVILITIES.ACTION: {
        //     return ReducerFunctions.getProcessed(state, 'list', action);
        // }
        //
        // case GET_CIVILITIES.SUCCESS: {
        //     return ReducerFunctions.getSuccess(state, action.payload, 'list', CivilityEntity, action);
        // }
        //
        // case GET_CIVILITIES.FAILURE: {
        //     return ReducerFunctions.getFailure(state, action.payload, 'list', action);
        // }
        default: {
            return state;
        }
    }
}
