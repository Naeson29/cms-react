import { connect } from 'react-redux';
import Login from '../../components/app/login';
// import {
//     loginUser, loginUserFailure, loginUserSuccess,
// } from '../../actions/auth';

const mapStateToProps = (state) => {
    return {
        // error:state.Login.view.user.error,
        // loading: state.Login.view.user.loading,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { history } = ownProps;

    return {
        // loginUser:(username, password) => {
        //     dispatch(loginUser(username, password))
        //         .then((response) => {
        //
        //             if (response.payload !== undefined && response.payload.data !== undefined && response.payload.data.error){
        //                 dispatch(loginUserFailure(response.payload));
        //             }
        //             else {
        //                 dispatch(loginUserSuccess(response.payload));
        //                 history.push('/');
        //             }
        //         })
        //         .catch((error) => {
        //             if (error.response.status === 401) {
        //                 dispatch(loginUserFailure(error.response.data.error));
        //             }
        //         });
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);