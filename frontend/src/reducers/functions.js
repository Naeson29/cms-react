class ReducerFunctions {
    defaultInit(state, action) {
        state.view.error = null;
        state.view.loading = true;

        return {...state};
    }

    defaultProcessed(state, action) {
        return {...state};
    }

    defaultFailure(state, payload, action) {
        state.view.error = payload;
        state.view.loading = false;

        return {...state};
    }

    listInit(state, action) {
        if (!state.view) {
            state.view = {
                content: [],
                page: 1,
                last_page: 1
            };
        } else {
            state.view.content.length = 0;
            state.view.page = 1;
            state.view.last_page = 1;
        }

        return this.defaultInit(state);
    }

    getInit(state, action) {
        return this.listInit(state, action);
    }

    getProcessed(state, action) {
        return this.defaultProcessed(state, action);
    }

    getSuccess(state, payload, entityFunction, action) {
        state.data = {...state.data};

        state.view.content = [...state.view.content];
        state.view.loading = false;
        state.view.error = null;

        return {...state};
    }

    getFailure(state, payload, action) {
        return this.defaultFailure(state, payload, action);
    }
}

export default new ReducerFunctions();