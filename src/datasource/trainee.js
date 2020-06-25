import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class TraineeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/trainee`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    async createTrainee(payload) {
        try{
            const response = await this.post('/', {...payload});
            const { data } = response;
            return data;
        } catch(error){
            console.log('Error: ', error);
        }

    }
    
    async deleteTrainee(ID) {
        const { id } = ID;
        const response = await this.delete(`/${id}`);
        const { data } = response;
        return data.id;
    }
    
    async getTrainee(options) {
        try {
            console.log('value of options in getTrainee', options);
            const response = await this.get('/', {...options});
            console.log('value of response in same', response);
            return response.data;
        } catch(error) {
            console.log('Error: ', error);
        }

    }
    
    async updateTrainee(payload) {
        const { dataToUpdate } = payload;
        const response = await this.put('/', {...dataToUpdate});
        const { data: { id} } = response;
        return id;
    }
}