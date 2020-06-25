import { UserInputError } from 'apollo-server';

export default {
    getAllTrainee : async(parent, args, context) => { 
        try {
            const { options } = args;
            const { dataSources: { traineeAPI } } = context;
            const response = await traineeAPI.getTrainee(options);
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
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },
};