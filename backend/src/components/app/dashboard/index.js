import React, {Component} from 'react';
import {connect}          from 'react-redux';
import PropTypes          from 'prop-types';
import BigCalendar        from 'react-big-calendar';
import moment             from 'moment';
import Loader             from '../component/loading';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fr');

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            view: "day"
        };

        props.load();

        this._view = this._view.bind(this);
    }

    _view(type){
       this.setState({
           view : type
       });
    }

    render() {
        const {content, error, loading} = this.props;

        const locale = BigCalendar.momentLocalizer(moment);

        return (
            <div className={'dashboard'}>
                <h1>
                    <span>{'Tableau de bord'}</span>
                </h1>
                {
                    loading ? <Loader/> :
                        <div className={'calendar'}>
                            <BigCalendar
                                localizer={locale}
                                events={content}
                                view={this.state.view}
                                onView={(type) => {this._view(type)}}
                                startAccessor="start"
                                endAccessor="end"
                            />
                        </div>
                }

            </div>
        );
    }
}

export default connect()(Dashboard);

Dashboard.propTypes = {
    load    : PropTypes.func.isRequired,
    loading : PropTypes.bool,
    content : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    error   : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ])
};
