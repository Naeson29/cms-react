import SliderApi from '../api/sliderApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_SLIDER    = ClassicConstantList('GET_SLIDER');
export const CREATE_SLIDER = ClassicConstantList('CREATE_SLIDER');
export const UPDATE_SLIDER = ClassicConstantList('UPDATE_SLIDER');
export const DELETE_SLIDER = ClassicConstantList('DELETE_SLIDER');
export const ORDER_SLIDER  = ClassicConstantList('ORDER_SLIDER');

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

export let updateSlider = new ClassicActions(UPDATE_SLIDER, {
    action: (parameters) => {
        if (!parameters.sliderId) {
            console.error('Invalid sliderId');
            return {};
        }
        return SliderApi.updateSlider(parameters.sliderId, parameters);
    },
});

export let deleteSlider = new ClassicActions(DELETE_SLIDER, {
    action: (parameters) => {
        if (!parameters.sliderId) {
            console.error('Invalid sliderId');
            return {};
        }
        return SliderApi.deleteSlider(parameters.sliderId, parameters);
    },
});


export let orderSlider = new ClassicActions(ORDER_SLIDER, {
    action: (parameters) => {
        return SliderApi.orderSlider(parameters);
    },
});
