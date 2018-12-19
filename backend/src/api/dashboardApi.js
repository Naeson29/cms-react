import Api from './api';
import {HTTP_GET} from './utils';

export default class DashboardApi {

    static getEvent(parameters){
        return Api.callApi(HTTP_GET, 'events/', parameters, false);
    }
}