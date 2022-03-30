// Import Dependencies
const { DataTypes } = require("sequelize");
const { db } = require("../index.js");

// Create Schema
const PackingList_PackingListItem = db.define("packingList_PackingListItem", {
  packingList_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  packingListItem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Export Schema
module.exports = {
  PackingList_PackingListItem,
};
