import Api from './api';
import {HTTP_GET} from './utils';

export default class AuthApi {

    static auth(parameters){
        return Api.callApi(HTTP_GET, 'auth', parameters, false);
    }
}