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
        return this.getInit(state);
    }

    createProcessed(state) {
        return this.getProcessed(state);
    }

    createFailure(state, payload) {
        //Notifier(action, TYPE_ERROR, 'Echec de la création');
        return this.getFailure(state, payload);
    }

    createSuccess(state, payload, section, entityFunction, action) {
        // state.view[section].error = null;
        //
        // let newItem = {};
        // newItem[payload.id] = entityFunction(payload);
        // state.data = {...state.data, ...newItem};
        //
        // if (state.view[section].content !== undefined && !Array.isArray(state.view[section].content)) {
        //     state.view[section].content = newItem[payload.id];
        // }
        //
        // state.view[section].loading = false;
        // Notifier(action, TYPE_SUCCESS, 'Succès de la création');

        return {...state};
    }

}

export default new ReducerFunctions();