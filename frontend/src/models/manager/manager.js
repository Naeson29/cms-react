import store from '../../store';

const dispatch = store.dispatch;
// const state = store.state;

export default class Manager {
    classicDispatch(actionInit, action, actionSuccess, actionFailure, callback) {
        dispatch(actionInit());
        dispatch(action()).then((response) => {
            if (response.payload !== undefined && response.payload.data !== undefined && response.payload.data.error){
                dispatch(actionFailure(response.payload));

                if (typeof callback === 'function') {
                    callback(response.payload.data, false);
                }
            }
            else {
                dispatch(actionSuccess(response.payload.data));

                if (typeof callback === 'function') {
                    callback(response.payload.data, true);
                }
            }
        }).catch((error) => {
            console.error(error);
            dispatch(actionFailure(error.message));

            if (typeof callback === 'function') {
                callback(error.message, false);
            }
        });
    }
}