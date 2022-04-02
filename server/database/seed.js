const mysql = require("mysql2/promise");
const { db } = require("./index.js");
const { Trails } = require("./models/trails.js");
const { dummyParkData } = require("../../copyAPIparkData/dummyDataCopy.js");
const { PackingLists } = require("./models/packingLists.js");
const { PackingListItems } = require("./models/packingListItems.js");
const { Users } = require("./models/users.js");
const { async } = require("regenerator-runtime");
const birdsOfLA = require("./data/eBirdData.js")

db.options.logging = false;

const seedSqlize = () => {
  mysql
    .createConnection({ user: "root", password: "" })
    .then((db) =>
      db.query("CREATE DATABASE IF NOT EXISTS `TakeAHike`").then(() => db.end())
    )
    .then(() =>
      console.log(
        "\x1b[33m",
        "\nDatabase (MySQL): 'TakeAHike' successfully created!"
      )
    )
    .then(() => {
      return PackingListItems.sync({ force: true });
    })
    .then(() =>
      console.log(
        "\x1b[36m",
        "\nDatabase (MySQL): 'PackingListItems' table successfully created!"
      )
    )
    .then(() => setTimeout(() => PackingLists.sync({ force: true }), 2000))
    .then(() =>
      console.log(
        "\x1b[36m",
        "\nDatabase (MySQL): 'PackingLists' table successfully created!"
      )
    )
    .then(() => Trails.sync({ force: true }))
    .then(() =>
      console.log(
        "\x1b[36m",
        "\nDatabase (MySQL): 'Trails' table successfully created!"
      )
    )
    .then(() => setTimeout(() => Users.sync({ force: true }), 2000))
    .then(() =>
      console.log(
        "\x1b[36m",
        "\nDatabase (MySQL): 'Users' table successfully created!"
      )
    )

    .then(() => Promise.all(dummyParkData.map((txn) => Trails.create(txn))))
    .then((arr) =>
      console.log(
        "\x1b[32m",
        `\nDatabase (MySQL): Successfully seeded trails with ${arr.length} entries!\n`,
        "\x1b[37m"
      )
    )
    // .then(() => Promise.all(birdsOfLA.map((bird) => BirdList.create(bird))))
    // .then((arr) =>
    //   console.log(
    //     "\x1b[32m",
    //     `\nDatabase (MySQL): Successfully seeded birdList with ${arr.length} entries!\n`,
    //     "\x1b[37m"
    //   )
    // )
    .then(process.exit);
};

seedSqlize();
