import { connect }  from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logout}     from '../../actions/login';
import Header       from '../../components/app/component/header';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { history } = ownProps;

    return {
        logout:() => {
            logout();
            history.push('/login');
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));