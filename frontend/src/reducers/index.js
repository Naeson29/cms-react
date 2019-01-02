import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import HomeReducer         from './home';
import ParametersReducer   from './parameters';
import NewsReducer         from './news';


const rootReducer = combineReducers({
    Home       : HomeReducer,
    Parameters : ParametersReducer,
    News       : NewsReducer,
    routing : routerReducer,
});

export default rootReducer;