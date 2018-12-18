import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import Slider        from '../../components/app/slider';
import SliderManager from '../../models/manager/slider';

const mapStateToProps = (state) => {
    return {
        content : state.Slider.view.content,
        logged  : state.Slider.view.logged,
        loading : state.Slider.view.loading,
        error   : state.Slider.view.error
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {history} = ownProps;

    return {
        load: (parameters) => {
            SliderManager.slider(parameters);
        },
        createSlider: (parameters, callback) => {
            SliderManager.create(parameters, callback);
        },
        updateSlider: (sliderId, parameters, callback) => {
            SliderManager.update(sliderId, parameters, callback);
        },
        deleteSlider: (sliderId, parameters, callback) => {
            SliderManager.remove(sliderId, parameters, callback);
        },
        orderSlider: (parameters, callback) => {
            SliderManager.order(parameters, callback);
        },
        redirectLogin : () => {
            history.push('/login');
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));