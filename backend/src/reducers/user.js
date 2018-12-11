import {CHECK}          from '../actions/user';
import UserEntity       from '../models/entity/user';
import ReducerFunctions from './functions';

const INITIAL_STATE = {

};

export default function Login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHECK.INIT: {
            return ReducerFunctions.getInit(state);
        }
        case CHECK.ACTION: {
            return ReducerFunctions.getProcessed(state);
        }

        case CHECK.SUCCESS: {
            return ReducerFunctions.getSuccess(state, action.payload, UserEntity);
        }

        case CHECK.FAILURE: {
            return ReducerFunctions.getFailure(state, action.payload);
        }

        default: {
            return state;
        }
    }
}