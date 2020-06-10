import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

export default class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }

    run = () => {
      const { port, env } = this.config;
      console.log('Value of port and env', port, env);
      this.app.listen(port, () => {
        // this.httpServer.listen(port, () => {
        console.log(`Server started at ${port} ${env}`);
      })
  }
  
    initBodyParser = () => {
      const { app } = this;
      app.use('/graphql',bodyParser.urlencoded({ extended: false }));
      app.use('/graphql',bodyParser.json());
      return this;
    };

    bootstrap = () => {
        this.initBodyParser();
        return this;
    };

    setupApollo = (schema) => {
        const { app } = this;
        this.server = new ApolloServer({
          ...schema,
          healthCheck : () => (resolve) => {
            resolve('I am Ok');
          }
        });
        this.server.applyMiddleware({ app });
        // this.httpServer = createServer(app);
        // this.server.installSubscriptionHandlers(this.httpServer);
        this.run();
      };
}