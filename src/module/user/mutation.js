import { UserInputError } from 'apollo-server';

export default {
    loginUser: async( parent, args, context ) => {
        try {
            const { payload: { email, password } } = args;
            const { dataSources: { userAPI } } = context;
            const response = await userAPI.loginUser({ email, password });
            console.log('value of data got by login', response);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};