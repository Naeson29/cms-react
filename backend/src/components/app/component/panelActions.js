import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PanelActions extends Component {
    render() {
        return (
            <div className="action button-panel">
                {this.props.children}
            </div>
        );
    }
}

PanelActions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default PanelActions;
