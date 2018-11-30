import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import {ToastContainer} from 'react-toastify';

import '../scss/styles.scss';

import Full from './containers/full';

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <div>
                <ToastContainer
                    draggable={true}
                    autoClose={3000}
                    position={'top-center'}
                />
                <Switch>
                    <Route path="/" name="dashboard" component={Full}/>
                </Switch>
            </div>
        </HashRouter>
    </Provider>
), document.getElementById('app'));
