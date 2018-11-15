import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dashboard from '../components/app/dashboard';
import DashboardManager from '../models/manager/dashboard';

const mapStateToProps = (state) => {
    return {
        slider       : state.Dashboard.slider.content,
        loadingSlide : state.Dashboard.slider.loading
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            DashboardManager.slider(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));