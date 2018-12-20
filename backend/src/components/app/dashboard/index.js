import React, {Component} from 'react';
import {connect}          from 'react-redux';
import PropTypes          from 'prop-types';
import Loader             from '../component/loading';
import Calendar           from './calendar';
import PanelFunctions     from '../../../containers/panel/functions';

class Dashboard extends Component {

    constructor(props){
        super(props);
        props.load();

        this._updateCalendar = this._updateCalendar.bind(this);
    }

    _updateCalendar(){
        this.forceUpdate();
    }

    render() {
        const {content, loading, updateEvent, openRightPanel} = this.props;

        return (
            <div className={'dashboard'}>
                <h1>
                    <span>{'Tableau de bord'}</span>
                </h1>
                {
                    loading ? <Loader/> :
                        <Calendar
                            content={content}
                            updateEvent={updateEvent}
                            openRightPanel={openRightPanel}
                            updateCalendar={this._updateCalendar}
                        />
                }
            </div>
        );
    }
}

export default connect(() => {return {};}, PanelFunctions)(Dashboard);

Dashboard.propTypes = {
    load           : PropTypes.func.isRequired,
    openRightPanel : PropTypes.func.isRequired,
    updateEvent    : PropTypes.func.isRequired,
    loading        : PropTypes.bool,
    content        : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    error          : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ])
};
