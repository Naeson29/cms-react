import Api from './api';
import {HTTP_GET, HTTP_PUT} from './utils';

const API_PREFIX = 'parameters';

export default class ParametersApi {

    static getParameters(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }
}