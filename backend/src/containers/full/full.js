import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Full           from '../../components/app/full/index';
import UserManager    from '../../models/manager/user';

const mapStateToProps = () => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const full = {
        load: () => {
            UserManager.check((datum, success) => {
                if(!success){
                    full.redirectLogin();
                }
            })
        },
        redirectLogin: () => {
            ownProps.history.push('/login');
        }
    };

    return full;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
