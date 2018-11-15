import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import DashboardReducer from './dashboard';


const rootReducer = combineReducers({
    Dashboard  : DashboardReducer,
    routing    : routerReducer,
});

export default rootReducer;