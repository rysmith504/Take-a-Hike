const { Router } = require('express');
const mapRouter = Router();
const {sequelize, Op} = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
const axios = require('axios');
const { BirdList } = require("../models/birdList.js")
const { Markers } = require("../models/markers.js")


//////////////////////MAP//////////////////////
// use city to get coordinates from Google
mapRouter.get('/latLng', (req, res) => {
    const { city } = req.query;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
    .then(( response ) => {
    res.send(response.data.results[0].geometry.location)})
    .catch((err) => res.sendStatus(500));
  });

mapRouter.get('/mapBirds', (req, res) => {
  BirdList.findAll({attributes: ['commonName']})
  // BirdList.findAll()
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

mapRouter.get('/markers', (req, res) => {
  Markers.findAll()
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


mapRouter.post('/markers', (req, res) => {
  const {
    commonName,
    time,
    lat,
    lng,
  } = req.body;
    console.log(req.body);
  Markers.create({
    commonName,
    time,
    lat,
    lng,
  })
    .then((markers) => {res.json(markers)})
    .catch((err) => {
      console.error('ERROR: ', err);
      res.sendStatus(404);
    });
});

module.exports = {
    mapRouter,
  }