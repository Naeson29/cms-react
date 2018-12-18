import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';
import PropTypes            from 'prop-types';

import Sidebar       from '../component/sidebar';
import Header        from '../../../containers/component/header';
import Dashboard     from '../../../containers/dashboard';
import User          from '../../../containers/user';
import Slider        from '../../../containers/slider';
import PanelManager  from '../../../containers/panel/panelManager';
import Loader        from '../component/loading';

class Full extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading : true,
        };

        props.load();
    }

    componentDidUpdate() {
        const {loading} = this.state;

        if(!this.props.auth && !this.props.loading){
            this.props.redirectLogin();
        }

        if (loading && !this.props.loading && !this.props.error) {
            this.setState({
                loading:false
            });
        }
    }

    render() {
        const {loading} = this.state;

        if (loading) {
            return (
                <div className={'root-loader'}>
                    <Loader />
                </div>
            );
        }

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
                        <Route path="/user" name="user" component={User}/>
                        <Route path="/slider" name="slider" component={Slider}/>
                    </Switch>
                    <PanelManager/>
                </div>
            </div>
        );
    }
}
export default Full;

Full.propTypes = {
    load           : PropTypes.func.isRequired,
    redirectLogin  : PropTypes.func.isRequired,
    loading        : PropTypes.bool,
    auth           : PropTypes.bool,
    error          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ])
};
