import Notifier, {TYPE_ERROR, TYPE_INFO} from '../utils/notifier';

class ReducerFunctions {

    getInit(state) {
        if (!state.view) {
            state.view = {
                content: [],
            };
        }
        state.view.error = null;
        state.view.loading = true;

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

    getSuccess(state, payload) {
        state.data = {...state.data};
        state.view.content = payload;
        state.view.loading = false;
        state.view.error   = null;

        return {...state};
    }

    createInit(state) {
        state.form = {
            loading : true,
            error   : null,
            success : false
        };
        return {...state};
    }

    createProcessed(state) {
        return {...state};
    }

    createFailure(state, payload) {
        state.form = {
            loading : false,
            error   : payload,
        };
        Notifier(action, TYPE_ERROR, 'Echec de la création');
        return {...state};
    }

    createSuccess(action, state, payload) {
        state.form = {
            loading : false,
            error   : null,
            success : payload
        };
        Notifier(action, TYPE_INFO, 'Succès de la création');
        return {...state};
    }

    updateInit(state) {
        state.form = {
            loading : true,
            error   : null,
            success : false
        };
        return {...state};
    }

    updateProcessed(state) {
        return {...state};
    }

    updateFailure(state, payload) {
        state.form = {
            loading : false,
            error   : payload,
            success : false
        };
        Notifier(action, TYPE_ERROR, 'Echec de la création');
        return {...state};
    }

    updateSuccess(action, state, payload) {
        state.form = {
            loading : false,
            error   : null,
            success : payload
        };
        Notifier(action, TYPE_INFO, 'Succès de la modification');
        return {...state};
    }

    deleteInit(state) {
        state.view.error = null;
        state.view.loading = true;

        return {...state};
    }

    deleteProcessed(state) {
        return {...state};
    }

    deleteFailure(action, state, payload) {
        state.view.error = payload;
        state.view.loading = false;

        Notifier(action, TYPE_INFO, 'Echec de la suppression');
        return {...state};
    }

    deleteSuccess(action, state, payload) {
        state.view.content = payload;
        state.view.loading = false;
        state.view.error   = null;

        Notifier(action, TYPE_INFO, 'Succès de la suppression');
        return {...state};
    }
}

export default new ReducerFunctions();