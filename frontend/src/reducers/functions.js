class ReducerFunctions {

    // Common
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
        state.view.error   = false;

        return {...state};
    }

    // Parameters
    getInitParameters(state) {
        if (!state.parameters) {
            state.parameters = {
                content: [],
            };
        }
        state.parameters.error = false;
        state.parameters.loading = true;

        return {...state};
    }

    getFailureParameters(state, payload) {
        state.parameters.error = payload;
        state.parameters.loading = false;

        return {...state};
    }

    getSuccessParameters(state, payload) {
        state.parameters.content = payload;
        state.parameters.loading = false;
        state.parameters.error   = false;

        return {...state};
    }


    //Slider
    getInitSlider(state) {
        state.slider.error   = false;
        state.slider.loading = true;
        return {...state};
    }

    getSuccessSlider(state, payload){
        state.data = {...state.data};
        state.slider.content = payload;
        state.slider.loading = false;
        return {...state};
    }

    getFailureSlider(state, payload) {
        state.slider.error = payload;
        state.slider.loading = false;

        return {...state};
    }
}

export default new ReducerFunctions();