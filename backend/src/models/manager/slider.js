import {getSlider} from '../../actions/dashboard';
import Manager from './manager';

class Slider extends Manager {

    slider(parameters, callback) {
        return this.classicDispatch(
            getSlider.INIT,
            () => getSlider.ACTION(parameters),
            (content) => getSlider.SUCCESS(content, parameters),
            (error) => getSlider.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Slider();

