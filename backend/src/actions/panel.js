export const CLOSE_PANEL            = 'CLOSE_PANEL';
export const OPEN_RIGHT_PANEL       = 'OPEN_RIGHT_PANEL';
export const CLOSE_ALL_RIGHT_PANEL  = 'CLOSE_ALL_RIGHT_PANEL';

export function closePanel(id, status) {
    return {
        type: CLOSE_PANEL,
        payload: id,
        status: status,
    };
}

export function openRightPanel(panel, parameters, callbacks, originId) {
    return {
        type: OPEN_RIGHT_PANEL,
        payload: {
            label: panel,
            parameters: parameters,
            callbacks: callbacks,
            originId: originId
        }
    };
}

export function closeAllRightPanel(status) {
    return {
        type: CLOSE_ALL_RIGHT_PANEL,
        status: status,
    };
}