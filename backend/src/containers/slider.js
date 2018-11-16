import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import Slider        from '../components/app/slider';
import SliderManager from '../models/manager/slider';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            //DashboardManager.slider(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));