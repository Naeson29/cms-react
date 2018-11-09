import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Full           from '../components/app/full';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => {

        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Full));
