// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../index.js');

// Create Schema
const Photos = db.define('photos', {
  id: {Type: DataTypes.INTEGER, allowNull: false}, 
  // img: {Type: DataTypes.STRING, allowNull: false}, 
  // user_id: {Type: DataTypes.INTEGER, allowNull: false}, 
 });

 // Export Schema
 module.exports = {
   Photos,
 }