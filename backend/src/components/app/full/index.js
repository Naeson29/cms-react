import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';

import Header        from '../component/header';
import Sidebar       from '../component/sidebar';
import Dashboard     from '../../../containers/dashboard/index';
import Slider        from '../../../containers/slider/index';
import PanelManager  from '../../../containers/panel/panelManager';

class Full extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container-app">
                <div className="header-app">
                    <Header/>
                </div>
                <Sidebar/>
                <div className={'content-app'}>
                    <Switch>
                        <Route exact path="/" name="dashboard" component={Dashboard}/>
                        <Route path="/dashboard" name="dashboard" component={Dashboard}/>
                        <Route path="/slider" name="slider" component={Slider}/>
                    </Switch>
                    <PanelManager/>
                </div>
            </div>
        );
    }
}
export default Full;
