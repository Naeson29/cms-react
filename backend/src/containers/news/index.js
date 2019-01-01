import { connect }   from 'react-redux';
import {withRouter}  from 'react-router-dom';
import News          from '../../components/app/news';
import NewsManager   from '../../models/manager/news';

const mapStateToProps = (state) => {
    return {
        content : state.News.view.content,
        logged  : state.News.view.logged,
        loading : state.News.view.loading,
        error   : state.News.view.error
    };
};

const mapDispatchToProps = () => {

    return {
        load: (parameters) => {
            NewsManager.news(parameters);
        },
        createNews: (parameters, callback) => {
            NewsManager.create(parameters, callback);
        },
        updateNews: (sliderId, parameters, callback) => {
            NewsManager.update(sliderId, parameters, callback);
        },
        deleteNews: (sliderId, parameters, callback) => {
            NewsManager.remove(sliderId, parameters, callback);
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));