import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Full           from '../../components/app/full/index';
import AuthManager    from '../../models/manager/auth';

const mapStateToProps = (state) => {
    return {
        loading : state.Auth.loading,
        error   : state.Auth.error,
        success : state.Auth.success
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {history} = ownProps;

    return {
        load: () => {
            AuthManager.auth((datum, success) => {
                if(!success){
                    history.push('/login');
                }
            });
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
