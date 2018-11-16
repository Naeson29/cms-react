import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dashboard from '../components/app/dashboard';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {

        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));