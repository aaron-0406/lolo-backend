import config from "../config/config";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
  },
  production: {
    username: USER,
    password: PASSWORD,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
  },
};
