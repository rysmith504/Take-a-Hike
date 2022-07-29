// Import Dependencies
const { DataTypes } = require("sequelize");
const { db } = require("../index.js");

// Create Schema
const Trips = db.define("trips", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tripName: { type: DataTypes.STRING, allowNull: false, unique: true },
  tripDescription: { type: DataTypes.STRING, allowNull: false },
  tripLocation: { type: DataTypes.STRING, allowNull: false },
  tripAddress: { type: DataTypes.STRING, allowNull: false },
  tripDate: {type: DataTypes.DATE, allowNull: false},
  user_id: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: { model: 'users', key: '_id' }},
});


// Export Schema
module.exports = {
  Trips,
};
