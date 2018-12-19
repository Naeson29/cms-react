import React, {Component} from 'react';
import {connect}          from 'react-redux';
import PropTypes          from 'prop-types';
import Loader             from '../component/loading';
import Calendar           from './calendar';

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            view: "agenda"
        };

        props.load();
    }

    render() {
        const {content, loading, updateEvent} = this.props;

        return (
            <div className={'dashboard'}>
                <h1>
                    <span>{'Tableau de bord'}</span>
                </h1>
                {
                    loading ? <Loader/> :
                        <Calendar content={content} updateEvent={updateEvent}/>
                }
            </div>
        );
    }
}

export default connect()(Dashboard);

Dashboard.propTypes = {
    load        : PropTypes.func.isRequired,
    updateEvent : PropTypes.func.isRequired,
    loading     : PropTypes.bool,
    content     : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    error       : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ])
};
