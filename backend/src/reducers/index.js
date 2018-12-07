import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import LoginReducer        from './login';
import DashboardReducer    from './dashboard';
import SliderReducer       from './slider';
import PanelReducer        from './panel';


const rootReducer = combineReducers({
    Login      : LoginReducer,
    Dashboard  : DashboardReducer,
    Slider     : SliderReducer,
    Panel      : PanelReducer,
    routing    : routerReducer,
});

export default rootReducer;