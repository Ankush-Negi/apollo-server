import { UserInputError } from 'apollo-server';

export default {
    getMyProfile : async(parent, args, context) => {
        try {
            const { dataSources: { userAPI } } = context;
            const response = await userAPI.getMe();
            return response.data;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }

    }
};