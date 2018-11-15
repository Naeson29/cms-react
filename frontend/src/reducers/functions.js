class ReducerFunctions {

    // Common

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


    //Slider

    getInitSlider(state) {
        state.slider.error   = null;
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