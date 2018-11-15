import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';

import Header  from '../component/header';
import Footer  from '../component/footer';
import Sidebar from '../component/sidebar';
import Dashboard    from '../../../containers/dashboard';

class Full extends Component {

    render() {
        return (
            <div className="container-app">
                <div className="header-app">
                    <Header/>
                </div>
                <Sidebar/>
                <div className={'content-app'}>
                    <Switch>
                        <Route exact path="/" name="Dashboard" component={Dashboard}/>
                        <Route path="/Dashboard" name="Dashboard" component={Dashboard}/>
                    </Switch>
                </div>
                {/*<div className="footer-app">*/}
                    {/*<Footer/>*/}
                {/*</div>*/}
            </div>
        );
    }
}
export default Full;
