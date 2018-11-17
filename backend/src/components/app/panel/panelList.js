import React, { Component } from 'react';
import Panel from './panel';
import {ACTIONS} from '../../../utils/actions';
import {  TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

// PRODUCT
//import PanelProduct from '../../../components/app/product/panelProduct';

class PanelList extends Component {
    constructor(props) {
        super(props);

        this._getWidth    = this._getWidth.bind(this);
        this._renderPanel = this._renderPanel.bind(this);
    }

    _getWidth() {
        return '100%';
    }

    _renderPanel(panel, position) {
        if (panel === undefined || panel.label === undefined || panel.id === undefined) {
            return (<div />);
        }

        panel.position = position;

        if (panel.parameters === undefined) {
            panel.parameters = {};
        }

        // Add _id on parameters to allow closePanel based on ID
        panel.parameters._id = panel.id;
        panel.parameters.key = panel.id;

        let component = (<div />);

        switch(panel.label) {
            // PRODUCT
            case ACTIONS.PANEL_PRODUCT:
                component   = (<PanelProduct {...panel.parameters} />);
                panel.title = panel.parameters.product ? 'Modification d\'un produit' : 'Ajout d\'un produit';
                break;

            default:
                console.error('Invalid panel action', panel.label);
                break;
        }

        return (
            <Panel {...panel}>
                {component}
            </Panel>
        );
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.aPanel.length) !== (this.props.aPanel.length);
    }

    render() {
        const { aPanel } = this.props;

        let panelContent = '';

        if (aPanel.length) {
            panelContent = aPanel.map((panel) => (
                <CSSTransition
                    key={'trans_right_' + panel.id}
                    classNames={'panel'}
                    timeout={{enter: 500, exit: 500}}>
                    <div className={'panel-container right'}
                        style={{width: this._getWidth()}}>
                        {this._renderPanel(panel, 'right')}
                    </div>
                </CSSTransition>
            ));
        }

        return (
            <TransitionGroup>
                {panelContent}
            </TransitionGroup>
        );
    }
}

PanelList.propTypes = {
    aPanel : PropTypes.array,
    left   : PropTypes.bool
};

export default PanelList;
