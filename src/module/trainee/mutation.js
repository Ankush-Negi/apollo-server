import PubSub from '../pubsub';
import { UserInputError } from 'apollo-server';
import constant from '../../lib/constant';

export default {
    createTrainee: async( parent, args, context ) => {
        try{
            const { user } = args;
            const { dataSources: { traineeAPI } } = context;
            const addUser = await traineeAPI.createTrainee(user);
            PubSub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addUser });
            return addUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    deleteTrainee: async( parent, args, context ) => {
        try {
            const { id } = args;
            const { dataSources: { traineeAPI } } = context;
            const deleteUser = await traineeAPI.deleteTrainee({id});
            console.log('deleteUser', deleteUser);
            PubSub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deleteUser });
            return deleteUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    updateTrainee: async( parent, args, context ) => {
        try {
            const { dataSources: { traineeAPI } } = context;
            const updateUser = await traineeAPI.updateTrainee({...args});
            PubSub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updateUser});
            return updateUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};