const { Sequelize } = require("sequelize");
require("dotenv").config();

const db_connection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    port: "5432",
    define: {
      underscored: true,
      freezeTableName: true,
    },
    logging: console.log,
  }
);

module.exports = db_connection;
