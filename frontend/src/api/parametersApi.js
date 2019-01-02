import Api from './api';
import {HTTP_GET} from './utils';

export default class ParametersApi {

    static getParameters(parameters){
        return Api.callApi(HTTP_GET, 'parameters/', parameters, false);
    }
}