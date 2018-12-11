import { connect }   from 'react-redux';
import Login         from '../../components/app/login';
import LoginManager  from '../../models/manager/login';
import UserManager   from "../../models/manager/user";

const mapStateToProps = (state) => {
    return {
        error    : state.Login.error,
        loading  : state.Login.loading,
        success  : state.Login.success,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {history} = ownProps;

    return {
        load  : () => {
            UserManager.auth((datum, success) => {
                if(success){
                    history.push('/');
                }
            })
        },
        login : (parameters) => {
            LoginManager.login(parameters, (datum, success) => {
                if(success){
                    history.push('/');
                }
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);