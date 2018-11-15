import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../scss/styles.scss';

import Full from './containers/full';

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/" name="Dashboard" component={Full}/>
                </Switch>
            </div>
        </HashRouter>
    </Provider>
), document.getElementById('app'));
