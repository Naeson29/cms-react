import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-animated-slider/build/horizontal.css';
import Loading from 'react-loading-components';
import PropTypes from 'prop-types';
import Config from '../../../configuration'

class News extends Component {

    constructor(props){
        super(props);
        props.load();
    }

    render() {
        const { loading, content } = this.props;
        const url = Config.get('api_url') + 'static/news/';

        return (
            <div className={'home'}>
                <div className={'content-full'}>
                    <h1>{'Actualités'}</h1>
                    <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">

                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(News);

News.propTypes = {
    load    : PropTypes.func.isRequired,
    loading : PropTypes.bool,
    content : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
