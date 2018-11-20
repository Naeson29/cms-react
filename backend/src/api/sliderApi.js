import Api from './api';
import {HTTP_GET, HTTP_POST} from './utils';

const API_PREFIX = 'sliders';


export default class SliderApi {

    static getSlider(parameters){
        return Api.callApi(HTTP_GET, `${API_PREFIX}/`, parameters, false);
    }

    static createSlider(parameters) {
        return Api.callApi(HTTP_POST, API_PREFIX + '/', parameters, false);
    }
}