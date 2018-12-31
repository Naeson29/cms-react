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
        createEvent: (parameters, callback) => {
            DashboardManager.create(parameters, callback);
        },
        updateEvent: (eventId, parameters, callback) => {
            DashboardManager.update(eventId, parameters, callback);
        },
        dropEvent: (eventId, parameters, callback) => {
            DashboardManager.drop(eventId, parameters, callback);
        },
        deleteEvent: (eventId, parameters, callback) => {
            DashboardManager.remove(eventId, parameters, callback);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));