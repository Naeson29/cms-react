import React, {Component} from 'react';
import {connect}          from 'react-redux';
import Loading            from 'react-loading-components';
import PropTypes          from 'prop-types';
import Config             from '../../../configuration';
import Truncate           from 'react-truncate';

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
                    {
                        loading ?
                            <div className={'loading-content'}>
                                <Loading type='oval' width={120} height={120} fill='#7E8284' className={'loading'}/>
                            </div>
                            :
                            <div className="content news col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                                {
                                    content.map((key, index) => {
                                        return (
                                            <div key={'news_' + index} className={'bloc-news'}>
                                                {
                                                    key.image !== undefined &&
                                                        <div
                                                            className={'bloc image'}
                                                            style={{ background: `url('${url + key.image}') no-repeat center center` }}
                                                        />
                                                }
                                                <div className={'bloc content-news'}>
                                                    <h2>
                                                        <Truncate lines={1} ellipsis={'...'}>
                                                            {key.label}
                                                        </Truncate>
                                                    </h2>
                                                    <p>
                                                        <Truncate lines={2} ellipsis={'...'}>
                                                            {key.text}
                                                        </Truncate>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                    }
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
