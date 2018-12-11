import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';

import Sidebar       from '../component/sidebar';
import Header        from '../../../containers/component/header';
import Dashboard     from '../../../containers/dashboard/index';
import Slider        from '../../../containers/slider/index';
import PanelManager  from '../../../containers/panel/panelManager';

const INTERVAL = 60000;

class Full extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading      : true,
            authInterval : setInterval(() => this.props.getAuth(), INTERVAL)
        };

        props.load();
    }

    componentWillUnmount() {
        const {authInterval} = this.state;
        clearInterval(authInterval);
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
