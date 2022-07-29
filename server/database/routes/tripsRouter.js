const { Router } = require('express');
const tripsRouter = Router();
const { Trips } = require("../models/trips");
const {sequelize, Op} = require('sequelize');
//////////////////////TRIPS//////////////////////
//GET req for all trips data
tripsRouter.get('/', (req, res) => {
  console.log('get trips-----');
  const { user_id } = req.query;
  Trips.findAll({
    where: {
      tripDate: {
        [Op.gte]: new Date(),
      },
      user_id,
    },
    order: [['tripDate', 'ASC']]
  })
    .then((trips) => {res.json(trips)})
    .catch((err) => {
      console.error('ERROR: ', err);
      res.sendStatus(404);
    });
});

tripsRouter.get('/pastTrips', (req, res) => {
    console.log('get trips-----');
    const { user_id } = req.query;
    Trips.findAll({
      where: {
        tripDate: {
          [Op.lt]: new Date(),
        },
        user_id,
      },
      order: [['tripDate', 'DESC']]
    })
      .then((trips) => {
        res.json(trips);
      })
      .catch((err) => {
        console.error('ERROR: ', err);
        res.sendStatus(404);
      });
  });
  

  tripsRouter.post('/', (req, res) => {
    console.log('NEW TRIP-----');
    
    const {
      tripName,
      tripDescription,
      tripLocation,
      tripAddress,
      tripDate,
      user_id 
    } = req.body;
      console.log(req.body);
    Trips.create({
      tripName,
      tripDescription,
      tripLocation,
      tripAddress,
      tripDate,
      user_id: user_id.userId
    })
      .then((trips) => {res.json(trips)})
      .catch((err) => {
        console.error('ERROR: ', err);
        res.sendStatus(404);
      });
  });


  module.exports = {
    tripsRouter,
  }