class ReducerFunctions {

    getProcessed(state, action) {
        return this.defaultProcessed(state, action);
    }

    getFailure(state, payload, action) {
        return this.defaultFailure(state, payload, action);
    }

    getSuccessSlider(state, payload){
        state.data = {...state.data};
        state.slider.content = payload;
        state.slider.loading = false;
        return {...state};
    }

    getSuccess(state, payload, entityFunction, action) {
        state.data = {...state.data};

        for (let i = 0; i < payload.data.length; ++i) {
            payload.data[i] = entityFunction(payload.data[i]);
            if (!state.data[payload.data[i].id]) {
                state.data[payload.data[i].id] = {};
            }
            Object.assign(state.data[payload.data[i].id], payload.data[i]);
            state.view[section].content.push(state.data[payload.data[i].id]);
        }

        state.view.content = [...state.view.content];
        state.view.loading = false;
        state.view.error = null;

        return {...state};
    }

    getInit(state, action) {
        return this.listInit(state, action);
    }

    listInit(state, action) {
        if (!state.view) {
            state.view = {
                content: [],
            };
        }
        return this.defaultInit(state);
    }


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
}

export default new ReducerFunctions();