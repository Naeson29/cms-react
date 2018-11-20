import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dashboard from '../components/app/dashboard';

const mapStateToProps = () => {
    return {

    };
};

const mapDispatchToProps = () => {

    return {
        load: () => {

        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));