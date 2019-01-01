import {getNews, createNews, updateNews, deleteNews} from '../../actions/news';
import Manager from './manager';

class News extends Manager {

    news(parameters, callback) {
        return this.classicDispatch(
            getNews.INIT,
            () => getNews.ACTION(parameters),
            (content) => getNews.SUCCESS(content, parameters),
            (error) => getNews.FAILURE(error, parameters),
            callback
        );
    }

    create(parameters, callback) {
        return this.classicDispatch(
            createNews.INIT,
            () => createNews.ACTION(parameters),
            (content) => createNews.SUCCESS(content, parameters),
            (error) => createNews.FAILURE(error, parameters),
            callback
        );
    }

    update(newsId, parameters, callback) {
        parameters.newsId = newsId;
        return this.classicDispatch(
            updateNews.INIT,
            () => updateNews.ACTION(parameters),
            (content) => updateNews.SUCCESS(content, parameters),
            (error) => updateNews.FAILURE(error, parameters),
            callback
        );
    }

    remove(newsId, parameters, callback) {
        parameters.newsId = newsId;
        return this.classicDispatch(
            deleteNews.INIT,
            () => deleteNews.ACTION(parameters),
            (content) => deleteNews.SUCCESS(content, parameters),
            (error) => deleteNews.FAILURE(error, parameters),
            callback
        );
    }
}

export default new News();

