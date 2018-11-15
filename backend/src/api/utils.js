import Config from '../configuration';

export const ROOT_URL       = Config.get('api_url');
export const HTTP_GET       = 'get';
export const HTTP_POST      = 'post';
export const HTTP_PUT       = 'put';
export const HTTP_DELETE    = 'delete';

export const AXIOS_CONF = {
    headers: {
        'Content-Type': 'application/json',
    }
};