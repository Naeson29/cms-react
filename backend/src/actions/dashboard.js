import DashboardApi from '../api/dashboardApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_SLIDER = ClassicConstantList('GET_SLIDER');

export let getSlider = new ClassicActions(GET_SLIDER, {
    action: (parameters) => {
        return DashboardApi.getSlider(parameters);
    },
});