import UserApi from '../api/userApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const CHECK = ClassicConstantList('CHECK');

export let check = new ClassicActions(CHECK, {
    action: () => {
        return UserApi.check();
    },
});