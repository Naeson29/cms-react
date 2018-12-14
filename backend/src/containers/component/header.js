import { connect }  from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header       from '../../components/app/component/header';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { history } = ownProps;

    return {
        logout:() => {
            localStorage.removeItem('token');
            history.push('/login');
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));