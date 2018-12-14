import {AXIOS_CONF, ROOT_URL} from './utils';
import Axios from 'axios/index';

export default class LoginApi {
    static login(params = {}) {
        let promise;
        promise = Axios.post(ROOT_URL + 'auth/login', params, AXIOS_CONF);
        return promise;
    }
}