import HomeApi from '../api/homeApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_SLIDER = ClassicConstantList('GET_SLIDER');

export let getSlider = new ClassicActions(GET_SLIDER, {
    action: (parameters) => {
        return HomeApi.getSlider(parameters);
    },
});