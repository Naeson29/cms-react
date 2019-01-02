import ParametersApi from '../api/parametersApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_PARAMETERS    = ClassicConstantList('GET_PARAMETERS');
export const UPDATE_PARAMETERS = ClassicConstantList('UPDATE_PARAMETERS');

export let getParameters = new ClassicActions(GET_PARAMETERS, {
    action: (parameters) => {
        return ParametersApi.getParameters(parameters);
    },
});

export let updateParameter = new ClassicActions(UPDATE_PARAMETERS, {
    action: (parameters) => {
        if (!parameters.parameterId) {
            console.error('Invalid parameterId');
            return {};
        }
        return ParametersApi.updateParameter(parameters.parameterId, parameters);
    },
});