const { DataTypes } = require('sequelize');
const { db } = require('../index.js');

const Markers = db.define('markers', {
  _id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  commonName: {type: DataTypes.STRING, allowNull: false, foreignKey: false},
  time: {type: DataTypes.DATE, allowNull: false, foreignKey: false},
  lat: {type: DataTypes.INTEGER, allowNull: false, foreignKey: false},
  lng: {type: DataTypes.INTEGER, allowNull: false, foreignKey: false},
 });

 module.exports = {
  Markers,
 }