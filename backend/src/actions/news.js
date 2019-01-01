import NewsApi from '../api/newsApi';
import {ClassicActions, ClassicConstantList} from './classic';

export const GET_NEWS    = ClassicConstantList('GET_NEWS');
export const CREATE_NEWS = ClassicConstantList('CREATE_NEWS');
export const UPDATE_NEWS = ClassicConstantList('UPDATE_NEWS');
export const DELETE_NEWS = ClassicConstantList('DELETE_NEWS');

export let getNews = new ClassicActions(GET_NEWS, {
    action: (parameters) => {
        return NewsApi.getNews(parameters);
    },
});

export let createNews = new ClassicActions(CREATE_NEWS, {
    action: (parameters) => {
        return NewsApi.createNews(parameters);
    },
});

export let updateNews = new ClassicActions(UPDATE_NEWS, {
    action: (parameters) => {
        if (!parameters.newsId) {
            console.error('Invalid newsId');
            return {};
        }
        return NewsApi.updateNews(parameters.newsId, parameters);
    },
});

export let deleteNews = new ClassicActions(DELETE_NEWS, {
    action: (parameters) => {
        if (!parameters.newsId) {
            console.error('Invalid newsId');
            return {};
        }
        return NewsApi.deleteNews(parameters.newsId, parameters);
    },
});