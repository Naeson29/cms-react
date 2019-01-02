import {getNews} from '../../actions/news';
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
}

export default new News();

