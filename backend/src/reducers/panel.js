import {
    CLOSE_PANEL,
    OPEN_RIGHT_PANEL,
    CLOSE_ALL_RIGHT_PANEL,
} from '../actions/panel';

const CLOSE_ALL_PANEL = '@@router/LOCATION_CHANGE';
const DEFAULT_CONTENT = [];

const INITIAL_STATE = {
    left: DEFAULT_CONTENT,
    right: DEFAULT_CONTENT,
};

let increment = 0;

export default function Panel(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLOSE_PANEL: {
            if (Array.isArray(state.right) && state.right.length) {
                let newRight = [];
                state.right.map((panel) => {
                    if (panel.id !== action.payload && panel.originId !== action.payload) {
                        newRight.push(panel);
                    }
                });

                state.right = newRight;
            }

            if (Array.isArray(state.left) && state.left.length) {
                let newLeft = [];
                state.left.map((panel) => {
                    if (panel.id !== action.payload && panel.originId !== action.payload) {
                        newLeft.push(panel);
                    }
                });

                state.left = newLeft;
            }

            return {...state};
        }

        case OPEN_RIGHT_PANEL: {
            for (let i = 0; i < state.right.length; ++i) {
                if (state.right[i].label === action.payload.label) {
                    action.payload.parameters._id = state.right[i].parameters._id;
                    action.payload.parameters.key = state.right[i].parameters.key;

                    if (state.right[i].parameters === action.payload.parameters) {
                        if ((i+1) === state.right.length) {
                            return state;
                        }

                        let oldPanels = state.right.splice(i, 1);

                        if (oldPanels.length) {
                            action.payload = oldPanels[0];
                        }
                    } else {
                        state.right.splice(i, 1);
                        break;
                    }
                }
            }

            action.payload.id = increment++;
            state.right = [...state.right, action.payload];

            return {...state};
        }

        case CLOSE_ALL_RIGHT_PANEL: {
            state.right = DEFAULT_CONTENT;
            return {...state};
        }

        case CLOSE_ALL_PANEL: {
            state.left = DEFAULT_CONTENT;
            state.right = DEFAULT_CONTENT;
            return {...state};
        }


        default: {
            return state;
        }
    }
}