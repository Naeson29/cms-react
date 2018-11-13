import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../scss/styles.scss';

import Full from './containers/full';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" name="Home" component={Full}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));
