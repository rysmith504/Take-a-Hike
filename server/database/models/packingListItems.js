// Import Dependencies
const { DataTypes } = require("sequelize");
const { db } = require("../index.js");
const { PackingLists } = require("./packingLists.js");
const { Users } = require("./users.js");

// Create Schema
const PackingListItems = db.define("packingListItems", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // //Remember to set the packing list id allowNull to false
  listItem: { type: DataTypes.STRING, allowNull: false },
  //Remember to set the packing list id allowNull to false
  packingList_id: {
    type: DataTypes.INTEGER,
    references: { model: PackingLists, key: "_id" },
    allowNull: true,
    foreignKey: true,
  },

  //Remember to set the user id allowNull to false
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: Users, key: "_id" },
    allowNull: true,
    foreignKey: true,
  },
});

// Export Schema
module.exports = {
  PackingListItems,
};
