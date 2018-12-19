import DashboardApi from '../api/dashboardApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_EVENT    = ClassicConstantList('GET_EVENT');
export const UPDATE_EVENT = ClassicConstantList('UPDATE_EVENT');

export let getEvent = new ClassicActions(GET_EVENT, {
    action: (parameters) => {
        return DashboardApi.getEvent(parameters);
    },
});

export let updateEvent = new ClassicActions(UPDATE_EVENT, {
    action: (parameters) => {
        if (!parameters.eventId) {
            console.error('Invalid eventId');
            return {};
        }
        return DashboardApi.updateEvent(parameters.eventId, parameters);
    },
});