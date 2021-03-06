import {getSlider, createSlider, updateSlider, deleteSlider, orderSlider} from '../../actions/slider';
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

    create(parameters, callback) {
        return this.classicDispatch(
            createSlider.INIT,
            () => createSlider.ACTION(parameters),
            (content) => createSlider.SUCCESS(content, parameters),
            (error) => createSlider.FAILURE(error, parameters),
            callback
        );
    }

    update(sliderId, parameters, callback) {
        parameters.sliderId = sliderId;
        return this.classicDispatch(
            updateSlider.INIT,
            () => updateSlider.ACTION(parameters),
            (content) => updateSlider.SUCCESS(content, parameters),
            (error) => updateSlider.FAILURE(error, parameters),
            callback
        );
    }

    remove(sliderId, parameters, callback) {
        parameters.sliderId = sliderId;
        return this.classicDispatch(
            deleteSlider.INIT,
            () => deleteSlider.ACTION(parameters),
            (content) => deleteSlider.SUCCESS(content, parameters),
            (error) => deleteSlider.FAILURE(error, parameters),
            callback
        );
    }

    order(parameters, callback) {
        return this.classicDispatch(
            orderSlider.INIT,
            () => orderSlider.ACTION(parameters),
            (content) => orderSlider.SUCCESS(content, parameters),
            (error) => orderSlider.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Slider();

