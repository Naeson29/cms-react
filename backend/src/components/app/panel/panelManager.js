import React, { Component } from 'react';
import PanelList from './panelList';
import PropTypes from 'prop-types';

class PanelManager extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.aRightPanel.length !== this.props.aRightPanel.length;
    }

    render() {
        const { aRightPanel } = this.props;

        return (
            <div>
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
