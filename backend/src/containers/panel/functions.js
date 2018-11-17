import { closePanel, openRightPanel, closeAllRightPanel} from '../../actions/panel';
import PanelManager from '../../models/manager/panel';

export default function(dispatch, ownProps) {
    let originId = undefined;
    if (ownProps !== undefined && ownProps._id !== undefined) {
        originId = ownProps._id;
    }

    return {
        closePanel: (id, status) => {
            if (status === undefined) {
                status = true;
            }

            PanelManager.closePanel(id, status);
            dispatch(closePanel(id, status));
        },
        openRightPanel: (panel, parameters, callbacks) => {
            dispatch(openRightPanel(panel, parameters, callbacks, originId));
        },
        closeAllRightPanel: () => {
            PanelManager.closeAllRightPanel();
            dispatch(closeAllRightPanel());
        },
        closeAllPanel: () => {
            dispatch(closeAllRightPanel());
        }
    };
}