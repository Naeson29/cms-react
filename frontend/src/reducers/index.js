import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from './home';


const rootReducer = combineReducers({
    Home : HomeReducer,
});

export default rootReducer;