import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import DashboardReducer    from './dashboard';
import SliderReducer       from './slider';


const rootReducer = combineReducers({
    Dashboard  : DashboardReducer,
    Slider     : SliderReducer,
    routing    : routerReducer,
});

export default rootReducer;