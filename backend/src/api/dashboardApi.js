import Api from './api';
import {HTTP_GET, HTTP_PUT} from './utils';

const API_PREFIX = 'events';

export default class DashboardApi {

    static getEvent(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }

    static updateEvent(eventId, parameters) {
        return Api.callApi(HTTP_PUT, API_PREFIX + `/${eventId}/`, parameters, false);
    }
}