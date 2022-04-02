// Import Dependencies
const { DataTypes } = require("sequelize");
const { db } = require("../index.js");

// Create Schema
const Users = db.define("users", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: { type: DataTypes.STRING(80), allowNull: false },
  birdSightingsArray: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  }
  // password: {Type: DataTypes.STRING, allowNull: false}, (SANTO!!!!!!)
});

// Export Schema
module.exports = {
  Users,
};
