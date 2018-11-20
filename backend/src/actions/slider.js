import SliderApi from '../api/sliderApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_SLIDER    = ClassicConstantList('GET_SLIDER');
export const CREATE_SLIDER = ClassicConstantList('CREATE_SLIDER');

export let getSlider = new ClassicActions(GET_SLIDER, {
    action: (parameters) => {
        return SliderApi.getSlider(parameters);
    },
});

export let createSlider = new ClassicActions(CREATE_SLIDER, {
    action: (parameters) => {
        return SliderApi.createSlider(parameters);
    },
});