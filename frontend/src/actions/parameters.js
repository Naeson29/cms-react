import ParametersApi from '../api/parametersApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_PARAMETERS = ClassicConstantList('GET_PARAMETERS');

export let getParameters = new ClassicActions(GET_PARAMETERS, {
    action: (parameters) => {
        return ParametersApi.getParameters(parameters);
    },
});