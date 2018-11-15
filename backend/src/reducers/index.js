import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import DashboardReducer from './dashboard';


const rootReducer = combineReducers({
    dashboard  : DashboardReducer,
    routing    : routerReducer,
});

export default rootReducer;