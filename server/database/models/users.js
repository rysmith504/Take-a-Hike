// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../index.js');

// Create Schema
const Users = db.define('users', {
  id: {Type: DataTypes.INTEGER, allowNull: false},
  name: {Type: DataTypes.STRING, allowNull: false},
  password: {Type: DataTypes.STRING, allowNull: false},
 });

 // Export Schema
 module.exports = {
   Users,
 }