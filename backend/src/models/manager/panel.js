import store from '../../store';

function _callbackClose(panel, status) {
    if (panel.callbacks && panel.callbacks.onClose) {
        panel.callbacks.onClose(status);
    }
}

class Panel {
    closePanel(id, status) {
        // TODO : Status is currently forced to "true" to avoid close & reload issues
        status = true;
        const state = store.getState();
        if (Array.isArray(state.Panel.right) && state.Panel.right.length) {
            state.Panel.right.map((panel) => {
                if (panel.id === id || panel.originId === id) {
                    _callbackClose(panel, status);
                }
            });
        }

        if (Array.isArray(state.Panel.left) && state.Panel.left.length) {
            state.Panel.left.map((panel) => {
                if (panel.id === id || panel.originId === id) {
                    _callbackClose(panel, status);
                }
            });
        }
    }

    closeAllRightPanel() {
        const state = store.getState();
        if (Array.isArray(state.Panel.right) && state.Panel.right.length) {
            state.Panel.right.map((panel) => {
                _callbackClose(panel, false);
            });
        }
    }
}

export default new Panel();