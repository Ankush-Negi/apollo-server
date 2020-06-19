import User from '../../service/user';

export default {
    createTrainee: ( parent, args, context ) => {
        const { user } = args;
        return User.createUser(user);
    },
    
    deleteTrainee: ( parent, args, context ) => {
        const { user } = args;
        return User.deleteUser(user);
    },

    updateTrainee: ( parent, args, context ) => {
        const { id, role } = args;
        return User.updateUser(id, role);
    }
}