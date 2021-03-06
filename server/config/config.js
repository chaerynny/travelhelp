require('dotenv').config();

const env = process.env;

const development = {
  username: env.DEV_DB_USER_NAME,
  password: env.DEV_DB_PASSWORD,
  database: env.DEV_DB_DATABASE,
  host: env.DEV_DB_HOST,
  port: env.DEV_DB_PORT,
  dialect: env.DEV_DB_DIALECT,
  client_url: "http://localhost:5533",
  oauth_env: 1 // localhost: [1], production: [0]
};

const test = {
  username: env.DEV_DB_USER_NAME,
  password: env.DEV_DB_PASSWORD,
  database: env.DEV_DB_DATABASE,
  host: env.DEV_DB_HOST,
  port: env.DEV_DB_PORT,
  dialect: env.DEV_DB_DIALECT,
  client_url: "http://localhost:5533",
  oauth_env: 1 // localhost: [1], production: [0]
};

const production = {
  username: env.DB_USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  client_url: "https://travelhelp.kr",
  oauth_env: 0 // localhost: [1], production: [0]
};

module.exports = { development, test, production };
