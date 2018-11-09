import Axios from 'axios';
import qs from 'qs';
import {ROOT_URL, AXIOS_CONF, HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE} from './utils';

let frontUrl    = ROOT_URL + 'api/';

export default class Api {

    static callApi(httpMethod, route, params = {}) {
        // Waiting for result
        let promise;
        let currentConf = { headers: {} };
        currentConf.headers = Object.assign(currentConf.headers, AXIOS_CONF.headers);

        let transformParams = false;
        for (let key in params) {
            if (key === 'files') {
                transformParams = true;
            }
        }

        if (transformParams) {
            let tempParams = new FormData();
            for (let key in params) {
                let param = params[key];
                if (key === 'files') {
                    for (let keyParam in param) {
                        tempParams.append(key+'[]', param[keyParam]);
                    }
                }
                tempParams.append(key, param);
            }

            params = tempParams;
        }

        let url = frontUrl + route;

        switch (httpMethod) {
            case HTTP_GET: {
                let urlParam = qs.stringify(params);
                if (urlParam.length) {
                    url += '?' + urlParam;
                }
                promise = Axios.get(url, currentConf);
            }
                break;
            case HTTP_POST:
                promise = Axios.post(url, params, currentConf);
                break;
            case HTTP_PUT:
                promise = Axios.put(url, params, currentConf);
                break;
            case HTTP_DELETE:
                if (Object.keys(params).length !== 0) {
                    currentConf.data = {};
                    currentConf.data.line_ids = params.line_ids;
                }
                promise = Axios.delete(url, currentConf);
                break;
            default:
                console.error(`API::callApi:: Unknown http method: ${httpMethod}`);
                break;
        }

        return promise;
    }
}