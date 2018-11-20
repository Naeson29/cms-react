import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import Slider        from '../components/app/slider';
import SliderManager from '../models/manager/slider';

const mapStateToProps = (state) => {
    return {
        content : state.Slider.view.content,
        loading : state.Slider.view.loading,
        error   : state.Slider.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            SliderManager.slider(parameters);
        },
        createSlider: (parameters, callback) => {
            SliderManager.create(parameters, callback);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));