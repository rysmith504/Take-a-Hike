// Import Dependencies
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require('dotenv').config();

// Initialized DB
const db = new Sequelize("TakeAHike", 
process.env.RDS_USERNAME, 
process.env.RDS_PASSWORD, 
{
  host: process.env.RDS_HOSTNAME, // The `host` parameter is required for other databases
  port: process.env.RDS_PORT,
  dialect: "mysql",
});

// Use Sequelize Authenticate Method
db.authenticate() // Runs a SELECT query and checks if the database responds correctly
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
db.query("set foreign_key_checks = 0");

// Export DB
module.exports = {
  db,
};

// ORIGINAL ------------------------
// // Import Dependencies
// const mysql = require("mysql2");
// const { Sequelize } = require("sequelize");

// // Initialized DB
// const db = new Sequelize("TakeAHike", "root", "", {
//   host: "localhost", // The `host` parameter is required for other databases
//   dialect: "mysql",
// });

// // Use Sequelize Authenticate Method
// db.authenticate() // Runs a SELECT query and checks if the database responds correctly
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
// db.query("set foreign_key_checks = 0");

// // Export DB
// module.exports = {
//   db,
// };