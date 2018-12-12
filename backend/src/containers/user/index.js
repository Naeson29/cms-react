import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import User          from '../../components/app/user';
import UserManager   from '../../models/manager/user';

const mapStateToProps = (state) => {
    return {
        content : state.User.view.content,
        loading : state.User.view.loading,
        error   : state.User.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            UserManager.user(parameters);
        },
        createUser: (parameters, callback) => {
            UserManager.create(parameters, callback);
        },
        updateUser: (sliderId, parameters, callback) => {
            UserManager.update(sliderId, parameters, callback);
        },
        deleteUser: (sliderId, parameters, callback) => {
            UserManager.remove(sliderId, parameters, callback);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));