import React, {Component}   from 'react';
import {Switch, Route}      from 'react-router-dom';
import Loading              from 'react-loading-components';
import PropTypes            from 'prop-types';

import Header from '../component/header';
import Footer from '../component/footer';
import Home   from '../../../containers/home';

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

        if (loading && !this.props.loading && !this.props.error) {
            this.setState({
                loading:false
            });
        }
    }

    render() {
        const {loading} = this.state;
        const {content} = this.props;

        if (loading) {
            return (
                <div className={'root-loader'}>
                    <Loading type='oval' width={120} height={120} fill='#7E8284' className={'loading'}/>
                </div>
            );
        }

        let parameters = {};
        content.map((key) => {
            parameters[key.slug] = key.value;
        });

        return (

            <div className="container-app">
                <div className="header-app">
                    <Header parameters={parameters}/>
                </div>
                <Switch>
                    <Route exact path="/" name="home" component={Home}/>
                    <Route exact path="/home" name="home" component={Home}/>
                </Switch>
                <div className="footer-app">
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default Full;

Full.propTypes = {
    load           : PropTypes.func.isRequired,
    loading        : PropTypes.bool,
    error          : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    content        : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ])
};

