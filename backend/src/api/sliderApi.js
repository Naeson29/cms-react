import Api from './api';
import {HTTP_GET} from './utils';


export default class SliderApi {

    static getSlider(parameters){
        return Api.callApi(HTTP_GET, 'sliders/', parameters, false);
    }
}