import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-loading-components';

class Home extends Component {

    constructor(props){
        super(props);
        props.load();
    }

    render() {
        const { loadingSlide, slider } = this.props;

        return (
            <div className={'home'}>
                {
                    loadingSlide
                        ?
                        <div className={'slider-container'}>
                            <div className={'loading'}>
                                <Loading type='oval' width={120} height={120} fill='#7E8284' className={'loading'}/>
                            </div>
                        </div>
                        :
                        <Slider
                            className="slider-container"
                            previousButton={<FontAwesomeIcon icon={IconSolid.faChevronCircleLeft} />}
                            nextButton={<FontAwesomeIcon icon={IconSolid.faChevronCircleRight} />}
                            duration={800}
                        >
                            {
                                slider.map((item, index) => (
                                    <div key={'slider_' + index} className="slider-content" style={{ background: `url('${item.image}') no-repeat center center` }}>
                                        <div className="inner">
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                }
                <div className={'content-full'}>
                    <h1>{'Présentation'}</h1>
                    <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">

                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Home);
