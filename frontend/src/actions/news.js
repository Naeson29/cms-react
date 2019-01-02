import NewsApi from '../api/newsApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_NEWS = ClassicConstantList('GET_NEWS');

export let getNews = new ClassicActions(GET_NEWS, {
    action: (parameters) => {
        return NewsApi.getNews(parameters);
    },
});