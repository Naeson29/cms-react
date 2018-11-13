import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Home from '../components/app/home';
import HomeManager from '../models/manager/home';

const mapStateToProps = (state) => {
    return {
        slider       : state.Home.slider.content,
        loadingSlide : state.Home.slider.loading
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            HomeManager.slider(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));