import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {

    constructor(props){
        super(props);

        props.load();
    }

    render() {
        return (
            <div className={'dashboard'}>
                <h1>
                    <span>{'Tableau de bord'}</span>
                </h1>
            </div>
        );
    }
}

export default connect()(Dashboard);

Dashboard.propTypes = {
    load : PropTypes.func.isRequired
};
