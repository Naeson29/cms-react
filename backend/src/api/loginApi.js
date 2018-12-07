import Api from './api';
import {HTTP_POST} from './utils';

export default class LoginApi {

    static login(parameters){
        return Api.callApi(HTTP_POST, 'login/', parameters, false);
    }
}