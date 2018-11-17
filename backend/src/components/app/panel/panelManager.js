import React, { Component } from 'react';
import PanelList from './panelList';
import PropTypes from 'prop-types';

class PanelManager extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.aRightPanel.length + nextProps.aLeftPanel.length) !== (this.props.aRightPanel.length + this.props.aLeftPanel.length);
    }

    render() {
        const { aRightPanel, aLeftPanel } = this.props;

        return (
            <div>
                <PanelList left aPanel={aLeftPanel} />
                <PanelList right aPanel={aRightPanel} />
            </div>
        );
    }
}

PanelManager.propTypes = {
    aRightPanel: PropTypes.array,
    aLeftPanel: PropTypes.array,
};

export default PanelManager;
