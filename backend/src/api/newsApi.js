import Api from './api';
import {HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE} from './utils';

const API_PREFIX = 'news';

export default class NewsApi {

    static getNews(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }

    static createNews(parameters) {
        return Api.callApi(HTTP_POST, API_PREFIX + '/', parameters, false);
    }

    static updateNews(newsId, parameters) {
        return Api.callApi(HTTP_PUT, API_PREFIX + `/${newsId}/`, parameters, false);
    }

    static deleteNews(newsId, parameters) {
        return Api.callApi(HTTP_DELETE, API_PREFIX + `/${newsId}/`, parameters, false);
    }
}