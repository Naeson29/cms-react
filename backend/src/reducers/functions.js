import Notifier, {TYPE_ERROR, TYPE_INFO} from '../utils/notifier';

class ReducerFunctions {
    loginInit(state){
        state.login.error   = false;
        state.login.success = false;
        state.login.loading = true;
        return {...state};
    }

    loginProcessed(state){
        return {...state};
    }

    loginFailure(state, payload){
        state.login.error   = payload;
        state.login.loading = false;
        state.login.success = false;
        return {...state};
    }

    loginSuccess(state, payload){
        state.login.error   = false;
        state.login.loading = false;
        state.login.success = payload;
        return {...state};
    }

    getInit(state) {
        if (!state.view) {
            state.view = {
                content: [],
            };
        }
        state.view.error   = false;
        state.view.loading = true;
        state.auth         = true;

        return {...state};
    }

    getAuthInit(state){
        state.data.loading = true;
        state.data.error   = false;
        state.data.success = false;
        state.data.auth    = false;
        return {...state};
    }

    getProcessed(state) {
        return {...state};
    }

    getFailure(state, payload) {
        state.view.error   = payload;
        state.view.loading = false;
        state.auth         = payload.error !== 401;
        return {...state};
    }

    getAuthFailure(state, payload){
        state.data.loading = false;
        state.data.error   = payload;
        state.data.success = false;
        state.data.auth    = false;
        return {...state};
    }

    getSuccess(state, payload) {
        state.data         = {...state.data};
        state.view.content = payload.data;
        if(payload.logged) {
            state.view.logged  = payload.logged;
        }
        state.view.loading = false;
        state.view.error   = false;
        state.auth         = true;

        return {...state};
    }

    getAuthSuccess(state, payload){
        state.data.loading = false;
        state.data.error   = false;
        state.data.success = payload;
        state.data.auth    = true;
        return {...state};
    }

    createInit(state) {
        state.auth = true;
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
        state.auth = payload.error !== 401;
        state.form = {
            loading : false,
            error   : payload,
            success : false
        };

        if(!payload.code && state.auth){
            Notifier(action, TYPE_ERROR, 'Echec de la création');
        }

        return {...state};
    }

    createSuccess(action, state, payload) {
        state.view.content.push(payload.data);
        state.auth = true;
        state.form = {
            loading : false,
            error   : false,
            success : payload
        };
        Notifier(action, TYPE_INFO, 'Succès de la création');
        return {...state};
    }

    updateInit(state) {
        state.auth = true;
        state.form = {
            loading : true,
            error   : false,
            success : false,
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
        state.auth = payload.error !== 401;

        if(!payload.code && state.auth){
            Notifier(action, TYPE_ERROR, 'Echec de la modification');
        }
        return {...state};
    }

    updateSuccess(action, state, payload) {
        state.auth = true;
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

    dropInit(state) {
        return {...state};
    }

    dropProcessed(state) {
        return {...state};
    }

    dropSuccess(action, state, payload){
        state.auth = true;
        state.view.content.map((item, key) => {
            if(item._id === payload.data._id){
                state.view.content[key] = payload.data;
            }
        });
        return {...state};
    }

    dropFailure(action, state, payload) {
        state.view.error = payload;
        state.auth = payload.error !== 401;
        if(state.auth){
            Notifier(action, TYPE_ERROR, 'Echec du déplacement');
        }
        return {...state};
    }

    deleteInit(state) {
        state.view.error   = false;
        state.view.loading = true;
        state.auth         = true;

        return {...state};
    }

    deleteProcessed(state) {
        return {...state};
    }

    deleteFailure(action, state, payload) {
        state.view.error = payload;
        state.view.loading = false;
        state.auth = payload.error !== 401;

        if(state.auth){
            Notifier(action, TYPE_ERROR, 'Echec de la suppression');
        }
        return {...state};
    }

    deleteSuccess(action, state, payload) {
        state.view.content = state.view.content.filter((item) => item._id !== payload.data._id);
        state.view.loading = false;
        state.view.error   = false;
        state.auth         = true;

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
        state.auth = payload.error !== 401;
        if(state.auth){
            Notifier(action, TYPE_INFO, 'Echec de l\'ordre');
        }
        return {...state};
    }

    orderSuccess(action, state, payload) {
        state.view.content = payload.data;
        state.auth         = true;
        return {...state};
    }
}

export default new ReducerFunctions();