import Server from './server'
import config from './config/configuration';
import schema from './module';

const server = new Server(config);

server.bootstrap().setupApollo(schema);

console.log('Hello World');