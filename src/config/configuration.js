import { config } from 'dotenv';

config();

const { PORT, APOLLO_ENV } = process.env;
const configuration = Object.freeze({
  port: PORT,
  env: APOLLO_ENV
});

export default configuration;
