import { connect }       from 'react-redux';
import { withRouter }    from 'react-router-dom';
import Full              from '../components/app/full';
import ParametersManager from '../models/manager/parameters';

const mapStateToProps = (state) => {
    return {
        content : state.Parameters.parameters.content,
        loading : state.Parameters.parameters.loading,
        error   : state.Parameters.parameters.error,
    };
};

const mapDispatchToProps = () => {
    return {
        load: (parameters) => {
            ParametersManager.parameters(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
