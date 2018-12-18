import {LOGIN}          from '../actions/login';
import LoginEntity      from '../models/entity/login';
import ReducerFunctions from './functions';

const INITIAL_STATE = {
    login : {
        loading : false,
        error   : false,
        success : false
    }
};

export default function Login(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET' : {
            return INITIAL_STATE;
        }
        case LOGIN.INIT: {
            return ReducerFunctions.loginInit(state);
        }
        case LOGIN.ACTION: {
            return ReducerFunctions.loginProcessed(state);
        }

        case LOGIN.SUCCESS: {
            return ReducerFunctions.loginSuccess(state, action.payload, LoginEntity);
        }

        case LOGIN.FAILURE: {
            return ReducerFunctions.loginFailure(state, action.payload);
        }

        default: {
            return state;
        }
    }
}