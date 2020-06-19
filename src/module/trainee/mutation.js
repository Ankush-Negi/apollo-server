import User from '../../service/user';
import PubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    createTrainee: ( parent, args, context ) => {
        const { user } = args;
        const addUser = User.createUser(user);
        PubSub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addUser});
        return addUser;
    },

    deleteTrainee: ( parent, args, context ) => {
        const { id } = args;
        const deleteUser = User.deleteUser(id);
        PubSub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deleteUser});
        return deleteUser;
    },

    updateTrainee: ( parent, args, context ) => {
        const { id, role } = args;
        const updateUser = User.updateUser(id, role);
        PubSub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeUpdated: updateUser});
        return updateUser;
    }
}