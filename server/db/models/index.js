require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const options = {
  logging: false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  options
);

const Block = require("./block")(sequelize, DataTypes);
const Transaction = require("./transaction")(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Block = Block;
db.Transaction = Transaction;

module.exports = db;
