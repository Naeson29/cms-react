import Api from './api';
import {HTTP_DELETE, HTTP_GET, HTTP_POST, HTTP_PUT} from './utils';

const API_PREFIX = 'events';

export default class DashboardApi {

    static getEvent(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }

    static createEvent(parameters) {
        return Api.callApi(HTTP_POST, API_PREFIX + '/', parameters, false);
    }

    static updateEvent(eventId, parameters) {
        return Api.callApi(HTTP_PUT, API_PREFIX + `/${eventId}/`, parameters, false);
    }

    static deleteEvent(eventId, parameters) {
        return Api.callApi(HTTP_DELETE, API_PREFIX + `/${eventId}/`, parameters, false);
    }
}