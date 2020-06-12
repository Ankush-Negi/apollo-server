import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/user`;
    }
    getMe() {
        return this.getMe('/me');
    }
    loginUser(payload) {
        return this.post('/login', payload);
    }
}