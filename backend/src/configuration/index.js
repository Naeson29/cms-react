import { ConfigData } from './data';

export default class Config {
    static get(key) {
        if (ConfigData[key] !== undefined) {
            return ConfigData[key];
        }
        return null;
    }
}