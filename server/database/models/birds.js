// Import Dependencies
const { DataTypes } = require('sequelize');
const { db } = require('../index.js');

// Create Schema
const Birds = db.define('birds', {
  _id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  img: {type: DataTypes.BLOB, allowNull: false},
  user_id: {type: DataTypes.INTEGER, allowNull: false, foreignKey: true},
 });

 // Export Schema
 module.exports = {
  Birds,
 }