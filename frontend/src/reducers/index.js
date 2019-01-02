import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from './home';
import ParametersReducer from './parameters';


const rootReducer = combineReducers({
    Home       : HomeReducer,
    Parameters : ParametersReducer,
    routing : routerReducer,
});

export default rootReducer;