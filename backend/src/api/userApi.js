import Api from './api';
import {HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE} from './utils';

const API_PREFIX = 'users';

export default class UserApi {

    static getUser(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }
}