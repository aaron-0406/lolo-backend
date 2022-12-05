import { Sequelize } from "sequelize";
import config from "../config/config";
import { setupModels } from "../db/models/index";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: true,
});

setupModels(sequelize);

export default sequelize;
