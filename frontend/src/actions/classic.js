const SUFFIX = {
    INIT: '_INIT',
    ACTION: '',
    SUCCESS: '_SUCCESS',
    FAILURE:'_FAILURE'
};

export function ClassicConstantList(operation) {
    return {
        INIT: operation + SUFFIX.INIT,
        ACTION: operation + SUFFIX.ACTION,
        SUCCESS: operation + SUFFIX.SUCCESS,
        FAILURE: operation + SUFFIX.FAILURE,
    };
}

export class ClassicActions {
    constructor(actions, executionFunctions) {
        if (!actions) {
            console.error('Invalid action list');
            return;
        }

        this.actions = actions;
        this.executionFunctions = (executionFunctions ? executionFunctions : {});

        this.INIT = this.INIT.bind(this);
        this.ACTION = this.ACTION.bind(this);
        this.SUCCESS = this.SUCCESS.bind(this);
        this.FAILURE = this.FAILURE.bind(this);
    }

    INIT() {
        let payload = {
            processed: true
        };
        if (this.executionFunctions.init) {
            payload = this.executionFunctions.init();
        }

        return {
            type: this.actions.INIT,
            payload: payload
        };
    }

    ACTION(...parameters) {
        let payload = {};
        if (this.executionFunctions.action) {
            payload = this.executionFunctions.action(...parameters);
        }

        return {
            type: this.actions.ACTION,
            payload: payload
        };
    }

    SUCCESS(content, ...parameters) {
        let payload = content;
        if (this.executionFunctions.success) {
            payload = this.executionFunctions.success(content, ...parameters);
        }

        return {
            type: this.actions.SUCCESS,
            payload: payload
        };
    }

    FAILURE(error, ...parameters) {
        if (error === undefined) {
            error = 'Unknown';
        }

        let payload = error;
        if (this.executionFunctions.failure) {
            payload = this.executionFunctions.error(error, ...parameters);
        }

        return {
            type: this.actions.FAILURE,
            payload: payload
        };
    }
}