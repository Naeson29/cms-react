import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Full           from '../../components/app/full/index';
import UserManager    from '../../models/manager/user';

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {history} = ownProps;

    const full = {
        load: () => {
            full.getAuth();
        },
        getAuth : () => {
            UserManager.auth((datum, success) => {
                if(!success){
                    full.redirectLogin();
                }
            })
        },
        redirectLogin: () => {
            history.push('/login');
        }
    };

    return full;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
