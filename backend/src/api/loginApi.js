import {AXIOS_CONF, ROOT_URL} from './utils';
import Axios from "axios/index";

export default class LoginApi {

    static login(params = {}) {
        let promise;
        let that = this;

        promise = Axios.post(ROOT_URL + 'auth/login', params, AXIOS_CONF);

        promise.then((response) => {
            if (response.data) {
                localStorage.setItem('token', response.data.token);
            }
        }, (err) => {
            //console.log(err)
        });

        return promise;
    }
}