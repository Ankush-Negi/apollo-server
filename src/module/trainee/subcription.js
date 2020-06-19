import PubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    traineeAdded: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.TRAINEE_ADDED]
            );
        }
    },
    traineeUpdated: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.TRAINEE_UPDATED]
            );
        }
    },
    traineeDeleted: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.TRAINEE_DELETED]
            );
        }
    },
};