// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../index.js');

// Create Schema
const PackingList = db.define('packingList', {
  id: {Type: DataTypes.INTEGER, allowNull: false}, 
  name: {Type: DataTypes.STRING, allowNull: false}, 
 });

 // Export Schema
 module.exports = {
  PackingList,
 }