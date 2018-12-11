import Api from './api';
import {HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE} from './utils';

const API_PREFIX = 'user';

export default class UserApi {

    static auth(parameters){
        return Api.callApi(HTTP_GET, 'auth', parameters, false);
    }
}