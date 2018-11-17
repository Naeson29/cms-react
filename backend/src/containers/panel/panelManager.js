import { connect } from 'react-redux';
import PanelManager from '../../components/app/panel/panelManager';

const mapStateToProps = (state) => {
    return {
        aRightPanel: state.Panel.right,
    };
};

const mapDispatchToProps = () => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelManager);