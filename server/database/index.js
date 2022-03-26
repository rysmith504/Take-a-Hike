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

//   This can be done by either extending the Sequelize.Model class and running the .init() function, passing parameters, or by defining a const and assigning it the returned value of the .define() method from Sequelize.

// The latter is more concise, so we'll be going with that one:

// Mapping the Model to the Database
// Now that we have a Note model we can create the notes table in the database. In a production application we'd normally make database changes via migrations so that changes are tracked in source control.

// Though, to keep things concise, we'll use the .sync() method. What the .sync() does is simple - it synchronizes all the defined models to the database:

// Here, we've used the force flag and set it to true. If a table exists already exists, the method will DROP it and CREATE a new one. If it doesn't exist, a table is just created.

// Finally, let's create some sample notes that we'll then persist in the database:

// db.sync({ force: true }).then(() => {
//   console.log(`Database & tables created!`);

//   Trails.bulkCreate([
//     {
//       // id: 1,
//       // name: "Trail-1",
//       // rating: 5,
//       // description: "It was a very good trail!",
//     },
//   ])
//     .then(() => {
//       return Trails.findAll();
//     })
//     .then((notes) => {
//       console.log(notes);
//     });
// });
