// Import Dependencies
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// Initialized DB
const db = new Sequelize("TakeAHike", "root", "", {
  // The `host` parameter is required for other databases
  host: "localhost",
  dialect: "mysql",
});

// Finally, let's test the connection by running the .authenticate() method. Under the hood, it simply runs a SELECT query and checks if the database responds correctly:
// Check if DB is working
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  db,
};
