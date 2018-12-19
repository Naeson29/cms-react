import DashboardApi from '../api/dashboardApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_EVENT = ClassicConstantList('GET_EVENT');

export let getEvent = new ClassicActions(GET_EVENT, {
    action: (parameters) => {
        return DashboardApi.getEvent(parameters);
    },
});