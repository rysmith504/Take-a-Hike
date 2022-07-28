const { Router } = require('express');
const tripsRouter = Router();
const { Trips } = require("../models/trips");
const {sequelize, Op} = require('sequelize');
//////////////////////TRIPS//////////////////////
//GET req for all trips data
tripsRouter.get('/pastTrips', (req, res) => {
    console.log('get trips-----');
  
    Trips.findAll({
      where: {
        tripDate: {
          [Op.lt]: new Date(),
        },
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
  
  tripsRouter.get('/', (req, res) => {
    console.log('get trips-----');
  
    Trips.findAll({
      where: {
        tripDate: {
          [Op.gte]: new Date(),
        },
      },
      order: [['tripDate', 'ASC']]
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