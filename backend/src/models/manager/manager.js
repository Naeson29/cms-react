import store from '../../store';

const dispatch = store.dispatch;

export default class Manager {
    classicDispatch(actionInit, action, actionSuccess, actionFailure, callback) {
        dispatch(actionInit());

        dispatch(action())
            .then((response) => {
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
            })
            .catch((error) => {
                dispatch(actionFailure(error.response.data));

                if (typeof callback === 'function') {
                    callback(error.response.data, false);
                }
            });
    }
}