import Api from './api';
import {HTTP_POST} from './utils';

const API_PREFIX = 'login';

export default class LoginApi {

    static login(parameters){
        return Api.callApi(HTTP_POST, API_PREFIX, parameters, false);
    }
}