// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../index.js');

// Create Schema
const Trails = db.define('trails', {
  id: {Type: DataTypes.INTEGER, allowNull: false}, 
  name: {Type: DataTypes.STRING, allowNull: false}, 
  rating: {Type: DataTypes.INTEGER, allowNull: false}, 
  description: {Type: DataTypes.INTEGER, allowNull: false}
 });

 // Export Schema
 module.exports = {
   Trails,
 }