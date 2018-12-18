import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Full           from '../../components/app/full/index';
import AuthManager    from '../../models/manager/auth';

const mapStateToProps = (state) => {
    return {
        loading : state.Auth.data.loading,
        error   : state.Auth.data.error,
        success : state.Auth.data.success,
        auth    : state.Auth.data.auth
        && state.User.auth
        && state.Slider.auth
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {history} = ownProps;

    return {
        load: () => {
            AuthManager.auth();
        },
        redirectLogin : () => {
            history.push('/login');
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
