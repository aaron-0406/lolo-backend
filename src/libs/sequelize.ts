import { Sequelize } from "sequelize";
import config from "../config/config";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = "";

const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: true,
});

export default sequelize;
