import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import HomeReducer from './accountingFec';


const rootReducer = combineReducers({
    AccountingFec : AccountingFecReducer,
});

export default rootReducer;