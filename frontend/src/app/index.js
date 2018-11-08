import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import '../../scss/styles.scss';

import {Root} from './components/Root';
import {Home} from './components/Home';
import {NewItem} from './components/NewItem';

class App extends React.Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path={'/'} component={Root}>
                <IndexRoute component={Home}/>
                <Route path={'/home'} component={Home}/>
                <Route path={'/newItem'} component={NewItem}/>
            </Route>
        </Router>
    );
  }
}

render(
    <App/>, window.document.getElementById('app'));
