import Api from './api';
import {HTTP_GET} from './utils';

const API_PREFIX = 'items';

export default class HomeApi {

    static getSlider(parameters){
        return Api.callApi(HTTP_GET, API_PREFIX + '/', parameters, false);
    }
}