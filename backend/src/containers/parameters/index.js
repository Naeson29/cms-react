import { connect }       from 'react-redux';
import {withRouter}      from 'react-router-dom';
import Parameters        from '../../components/app/parameters';
import ParametersManager from '../../models/manager/parameters';

const mapStateToProps = (state) => {
    return {
        content : state.Parameters.view.content,
        logged  : state.Parameters.view.logged,
        loading : state.Parameters.view.loading,
        error   : state.Parameters.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            ParametersManager.parameters(parameters);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Parameters));