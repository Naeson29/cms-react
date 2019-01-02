import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import LoginReducer        from './login';
import DashboardReducer    from './dashboard';
import SliderReducer       from './slider';
import NewsReducer         from './news';
import PanelReducer        from './panel';
import UserReducer         from './user';
import AuthReducer         from './auth';
import ParametersReducer   from './parameters';


const rootReducer = combineReducers({
    Auth       : AuthReducer,
    Login      : LoginReducer,
    Dashboard  : DashboardReducer,
    Slider     : SliderReducer,
    News       : NewsReducer,
    User       : UserReducer,
    Panel      : PanelReducer,
    Parameters : ParametersReducer,
    routing    : routerReducer,
});

export default rootReducer;