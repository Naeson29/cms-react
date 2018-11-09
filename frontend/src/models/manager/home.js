import {getSlider} from '../../actions/home';
import Manager from './manager';

class Home extends Manager {
    getAll() {
        return this.search({ limit: 0 });
    }

    search(parameters, callback) {
        return this.classicDispatch(
            getSlider.INIT,
            () => getSlider.ACTION(parameters),
            (content) => getSlider.SUCCESS(content, parameters),
            (error) => getSlider.FAILURE(error, parameters),
            callback
        );
    }
}

export default new Home();

