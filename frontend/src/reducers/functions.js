class ReducerFunctions {
    defaultInit(state, section, action) {
        state.view[section].error = null;
        state.view[section].loading = true;

        return {...state};
    }

    defaultProcessed(state, section, action) {
        return {...state};
    }

    defaultFailure(state, payload, section, action) {
        state.view[section].error = payload;
        state.view[section].loading = false;

        return {...state};
    }

    listInit(state, section, action) {
        if (!state.view[section]) {
            state.view[section] = {
                content: [],
                page: 1,
                last_page: 1
            };
        } else {
            state.view[section].content.length = 0;
            state.view[section].page = 1;
            state.view[section].last_page = 1;
        }

        return this.defaultInit(state, section);
    }

    getInit(state, section, action) {
        return this.listInit(state, section, action);
    }

    getProcessed(state, section, action) {
        return this.defaultProcessed(state, section, action);
    }

    getSuccess(state, payload, section, entityFunction, action) {
        state.data = {...state.data};

        for (let i = 0; i < payload.data.length; ++i) {
            payload.data[i] = entityFunction(payload.data[i]);
            if (!state.data[payload.data[i].id]) {
                state.data[payload.data[i].id] = {};
            }
            Object.assign(state.data[payload.data[i].id], payload.data[i]);
            state.view[section].content.push(state.data[payload.data[i].id]);
        }

        state.view[section].content = [...state.view[section].content];
        state.view[section].page = payload.current_page;
        state.view[section].last_page = payload.last_page;
        state.view[section].loading = false;
        state.view[section].error = null;

        return {...state};
    }

    getFailure(state, payload, section, action) {
        return this.defaultFailure(state, payload, section, action);
    }
}

export default new ReducerFunctions();