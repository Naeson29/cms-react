import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import User          from '../../components/app/user';
import UserManager   from '../../models/manager/user';

const mapStateToProps = (state) => {
    return {
        content : state.User.view.content,
        logged  : state.User.view.logged,
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
        updateUser: (userId, parameters, callback) => {
            UserManager.update(userId, parameters, callback);
        },
        deleteUser: (userId, parameters, callback) => {
            UserManager.remove(userId, parameters, callback);
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));