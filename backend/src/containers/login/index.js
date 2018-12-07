import { connect }   from 'react-redux';
import Login         from '../../components/app/login';
import LoginManager  from '../../models/manager/login';

const mapStateToProps = (state) => {
    return {
        error    : state.Login.error,
        loading  : state.Login.loading,
        success  : state.Login.success,
    };
};

const mapDispatchToProps = () => {
    return {
        login : (parameters, callback) => {
            LoginManager.login(parameters, callback)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);