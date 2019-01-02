import { connect }  from 'react-redux';
import {withRouter} from 'react-router-dom';
import News         from '../components/app/news';
import NewsManager  from '../models/manager/news';

const mapStateToProps = (state) => {
    return {
        content : state.News.view.content,
        loading : state.News.view.loading,
        error   : state.News.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            NewsManager.news(parameters);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));