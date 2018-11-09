// import {
//     getCivilities, createCivility, updateCivility,
// } from '../../actions/civility/civility';
//
// import {formatFilteredParameters} from '../../utils/functions';
import Manager from '../manager';

class Home extends Manager {
    // getAll() {
    //     return this.search({ limit: 0 });
    // }
    //
    // search(parameters, callback) {
    //     return this.classicDispatch(
    //         getCivilities.INIT,
    //         () => getCivilities.ACTION(formatFilteredParameters(parameters)),
    //         (content) => getCivilities.SUCCESS(content, parameters),
    //         (error) => getCivilities.FAILURE(error, parameters),
    //         callback
    //     );
    // }
    //
    // create(parameters, callback) {
    //     return this.classicDispatch(
    //         createCivility.INIT,
    //         () => createCivility.ACTION(parameters),
    //         (content) => createCivility.SUCCESS(content, parameters),
    //         (error) => createCivility.FAILURE(error, parameters),
    //         callback
    //     );
    // }
    //
    // update(civilityId, parameters, callback) {
    //
    //     parameters.civilityId = civilityId;
    //
    //     return this.classicDispatch(
    //         updateCivility.INIT,
    //         () => updateCivility.ACTION(parameters),
    //         (content) => updateCivility.SUCCESS(content, parameters),
    //         (error) => updateCivility.FAILURE(error, parameters),
    //         callback
    //     );
    // }
}

export default new Home();

