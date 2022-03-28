// Import Dependencies
const { DataTypes } = require('sequelize');
const { db } = require('../index.js');

// Create Schema
const PackingList = db.define('packingList', {
  _id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true}, 
  name: {type: DataTypes.STRING, allowNull: false}, 
  user_id: {type: DataTypes.INTEGER, allowNull: false, foreignKey: true},
 });

 // Export Schema
 module.exports = {
  PackingList,
 }