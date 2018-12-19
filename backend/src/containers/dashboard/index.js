import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dashboard from '../../components/app/dashboard';
import DashboardManager from '../../models/manager/dashboard';

const mapStateToProps = (state) => {
    return {
        content : state.Dashboard.view.content,
        loading : state.Dashboard.view.loading,
        error   : state.Dashboard.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            DashboardManager.event(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));