import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';

import Header from '../component/header';
import Home   from '../../../containers/home';

class Full extends Component {

    render() {
        return (

            <div className="container-app">
                <div className="header-app">
                    <Header/>
                </div>
                <Switch>
                    <Route exact path="/" name="home" component={Home}/>
                    <Route exact path="/home" name="home" component={Home}/>
                </Switch>
            </div>
        );
    }
}
export default Full;
