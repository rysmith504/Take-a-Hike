const { DataTypes } = require('sequelize');
const { db } = require('../index.js');

const Gallery = db.define('galleries', {
  url: { type: DataTypes.STRING, allowNull: false, unique: true}, 
  description: { type: DataTypes.STRING(2000), allowNull: true },
  user_id: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: { model: 'users', key: '_id' } },
  location: { type: DataTypes.STRING, allowNull: false},
  category: { type: DataTypes.STRING, allowNull: false}
});

// Export Schema
module.exports = {
  Gallery,
};
