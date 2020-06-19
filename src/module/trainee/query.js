import User from '../../service/user';

export default {
    getAllTrainee : () => { 
        return User.getAllUsers();
    },
    getTrainee: (parent , args, context) => {
        return User.getUser(args)
    },
}