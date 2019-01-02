import Api from './api';
import {HTTP_GET} from './utils';

export default class NewsApi {

    static getNews(parameters){
        return Api.callApi(HTTP_GET, 'news/', parameters, false);
    }
}