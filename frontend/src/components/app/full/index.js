import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';

import Header from '../component/header';
import Home   from '../../../containers/home';

class Full extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading:true,
        };
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
        const {loading} = this.state;

        if (loading && !this.props.loading) {
            this.setState({
                loading:false
            });
        }
    }

    render() {
        const {loading} = this.state;

        // if (loading) {
        //     return (
        //         <div className={'root-loader'}>
        //             <Loader />
        //         </div>
        //     );
        // }

        return (

            <div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
