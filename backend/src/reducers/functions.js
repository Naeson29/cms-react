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
            success : false
        };
        return {...state};
    }

    createSuccess(state, payload) {
        state.form = {
            loading : false,
            error   : null,
            success : payload
        };
        return {...state};
    }

}

export default new ReducerFunctions();