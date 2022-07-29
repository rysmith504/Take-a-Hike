require('dotenv').config();
const mysql = require("mysql2/promise");
const {
  dummyTripsData
} = require("../../copyAPIparkData/dummyTripsData.js");
const {
  dummyParkData
} = require("../../copyAPIparkData/dummyDataCopy.js");
const {
  dummyUserData
} = require("../../copyAPIparkData/dummyUserData.js");

const seedSqlize = async () => {
  const rootDB = await mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
  });

  await rootDB.query("DROP DATABASE IF EXISTS TakeAHike;");
  await rootDB.query("CREATE DATABASE IF NOT EXISTS TakeAHike;");

  console.log(
    "\x1b[33m",
    "\nDatabase (MySQL): 'TakeAHike' successfully created!"
  )
  rootDB.end()

  const {
    db
  } = require("./index.js");
  await db.sync();
  const birdsOfLA = require("./data/eBirdData.js")
  const { Trails } = require("./models/trails.js");
  const { PackingLists } = require("./models/packingLists.js");
  const { PackingListItems } = require("./models/packingListItems.js");
  const { Users } = require("./models/users.js");
  const {Trips } = require("./models/trips.js");
  const { BirdList } = require("./models/birdList.js")
  const { BirdSightings } = require("./models/birdSightings.js")

  try {
  await Users.sync()
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'Users' table successfully created!"
  )
  await PackingLists.sync()
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'PackingLists' table successfully created!"
  )
  await BirdList.sync()
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'BirdList' table successfully created!"
  )
  await BirdSightings.sync()
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'BirdSightings' table successfully created!"
  )
  await PackingListItems.sync();
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'PackingListItems' table successfully created!"
  )
  await Trails.sync()

  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'Trails' table successfully created!"
  )

  Trips.sync()
  console.log(
    "\x1b[36m",
    "\nDatabase (MySQL): 'Trails' table successfully created!"
  )

  const parksArray = await Promise.all(dummyParkData.map((txn) => Trails.create(txn)))
  console.log(
    "\x1b[32m",
    `\nDatabase (MySQL): Successfully seeded trails with ${parksArray.length} entries!\n`,
    "\x1b[37m"
  )
  const birdArray = await Promise.all(birdsOfLA.map((bird) => BirdList.create(bird)))
  console.log(
    "\x1b[32m",
    `\nDatabase (MySQL): Successfully seeded birdList with ${birdArray.length} entries!\n`,
    "\x1b[37m"
  )
  const tripArray = await Promise.all(dummyTripsData.map((trip) => Trips.create(trip)))
  console.log(
    "\x1b[32m",
    `\nDatabase (MySQL): Successfully seeded trips with ${tripArray.length} entries!\n`,
    "\x1b[37m"
  )
  } catch (err) { 
    console.error('Error Seeding DB\n', err)
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seedSqlize();



// .catch(err => console.log(72, 'error', err))
// .then(process.exit);