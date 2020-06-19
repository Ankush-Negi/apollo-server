import User from '../../service/user';

export default {
    getAllTrainee : () => { 
        console.log('Value of getAll Users', User.getAllUsers());
        return User.getAllUsers();
    },
    getTrainee: (parent, args, context) => {
        return User.getUser(args);
    },
}