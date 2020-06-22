import { UserInputError } from 'apollo-server';

export default {
    getAllTrainee : async(parent, args, context) => { 
        try {
            const { options } = args;
            const { dataSources: { traineeAPI } } = context;
            console.log('inside query of getall', options);
            const response = await traineeAPI.getTrainee(options);
            console.log('Value of getAll Trainee', response);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },
    getTrainee: async(parent, args, context) => {
        try {
            const { dataSources: { traineeAPI } } = context;
            const response = await traineeAPI.getTrainee(args);
            console.log('Value of getSingle Trainee', response);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },
};