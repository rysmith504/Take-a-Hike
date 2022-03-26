// Import Dependencies
const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../index.js");

// Create Schema/Model
const Trails = db.define("trails", {
  // _id : refers to the database entry ids
  //  id : refers to the park id from the Api data

  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  length: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING(2000), allowNull: false },
  city: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  region: { type: DataTypes.STRING(255), allowNull: false },
  country: { type: DataTypes.STRING(20), allowNull: false },
  lat: { type: DataTypes.STRING(20), allowNull: false },
  lon: { type: DataTypes.STRING(20), allowNull: false },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  features: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  difficulty: { type: DataTypes.STRING(255), allowNull: false },
  rating: { type: DataTypes.INTEGER },

  thumbnail: {
    type: DataTypes.STRING(255),
  },
});

// Export Schema
module.exports = {
  Trails,
};

/**
  * const { Sequelize, DataTypes } = require('sequelize');

// Create sequelize connection to mysql database
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'todos'
});

// Declare our schema. This is the shape of our data
const Tasks = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: DataTypes.STRING(255),
  priority: { type: DataTypes.INTEGER, defaultValue: 2 },
  complete: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = {
  db: sequelize,
  Tasks,
};

  */
