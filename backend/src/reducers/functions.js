import Notifier, {TYPE_ERROR, TYPE_INFO} from '../utils/notifier';

class ReducerFunctions {
    loginInit(state){
        state.error   = false;
        state.loading = true;
        state.success = true;

        return {...state};
    }

    loginProcessed(state){
        return {...state};
    }

    loginFailure(state, payload){
        state.error   = payload;
        state.loading = false;
        state.success = false;

        return {...state};
    }

    loginSuccess(state, payload){
        state.error   = false;
        state.loading = false;
        state.success = payload;

        return {...state};
    }

    getInit(state) {
        if (!state.view) {
            state.view = {
                content: [],
            };
        }
        state.view.error = false;
        state.view.loading = true;

        return {...state};
    }

    getAuthInit(state){
        state.error   = false;
        state.loading = true;
        state.success = false;
        return {...state};
    }

    getProcessed(state) {
        return {...state};
    }

    getFailure(state, payload) {
        state.view.error = payload;
        state.view.loading = false;
        return {...state};
    }

    getAuthFailure(state, payload){
        state.loading = false;
        state.error   = payload;
        state.success = false;
        return {...state};
    }

    getSuccess(state, payload) {
        state.data = {...state.data};
        state.view.content = payload;
        state.view.loading = false;
        state.view.error   = false;

        return {...state};
    }

    getAuthSuccess(state, payload){
        state.loading = false;
        state.error   = false;
        state.success = payload;
        return {...state};
    }

    createInit(state) {
        state.form = {
            loading : true,
            error   : false,
            success : false
        };
        return {...state};
    }

    createProcessed(state) {
        return {...state};
    }

    createFailure(action, state, payload) {
        state.form = {
            loading : false,
            error   : payload,
            success : false
        };
        Notifier(action, TYPE_ERROR, 'Echec de la création');
        return {...state};
    }

    createSuccess(action, state, payload) {
        state.view.content.push(payload.data);
        state.form = {
            loading : false,
            error   : false,
            success : payload
        };
        Notifier(action, TYPE_INFO, 'Succès de la création');
        return {...state};
    }

    updateInit(state) {
        state.form = {
            loading : true,
            error   : false,
            success : false
        };
        return {...state};
    }

    updateProcessed(state) {
        return {...state};
    }

    updateFailure(action, state, payload) {
        state.form = {
            loading : false,
            error   : payload,
            success : false
        };
        Notifier(action, TYPE_ERROR, 'Echec de la création');
        return {...state};
    }

    updateSuccess(action, state, payload) {
        state.view.content.map((item, key) => {
            if(item._id === payload.data._id){
                state.view.content[key] = payload.data;
            }
        });
        state.form = {
            loading : false,
            error   : false,
            success : payload
        };
        Notifier(action, TYPE_INFO, 'Succès de la modification');
        return {...state};
    }

    deleteInit(state) {
        state.view.error = false;
        state.view.loading = true;

        return {...state};
    }

    deleteProcessed(state) {
        return {...state};
    }

    deleteFailure(action, state, payload) {
        state.view.error = payload;
        state.view.loading = false;

        Notifier(action, TYPE_ERROR, 'Echec de la suppression');
        return {...state};
    }

    deleteSuccess(action, state, payload) {
        state.view.content = state.view.content.filter((item) => item._id !== payload.data._id);
        state.view.loading = false;
        state.view.error   = false;

        Notifier(action, TYPE_INFO, 'Succès de la suppression');
        return {...state};
    }

    orderInit(state) {
        return {...state};
    }

    orderProcessed(state) {
        return {...state};
    }

    orderFailure(action, state, payload) {
        state.view.error = payload;

        Notifier(action, TYPE_INFO, 'Echec de l\'ordre');
        return {...state};
    }

    orderSuccess(action, state, payload) {
        state.view.content = payload.data;
        return {...state};
    }
}

export default new ReducerFunctions();