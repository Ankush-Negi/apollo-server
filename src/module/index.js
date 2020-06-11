import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import * as user from './user';
import * as trainee from './trainee';

const typesArray = fileLoader(path.join(__dirname, '/**/*.graphql'));
const typeDefs = mergeTypes(typesArray, {all: true});

console.log('Value of Query====>', user.Query);
console.log('Value of Query====>', trainee.Query);
console.log('Value of Mutation====>', trainee.Mutation);
console.log('Value of Subscription====>', trainee.Subscription);


export default {
    resolvers:{
        Query: {
            ...user.Query,
            ...trainee.Query
        },
        Mutation: {
            ...trainee.Mutation
        },
        Subscription: {
            ...trainee.Subscription
        }
    },
    typeDefs,
}