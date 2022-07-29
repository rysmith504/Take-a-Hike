const { Router } = require('express');
const mapRouter = Router();
const {sequelize, Op} = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
const axios = require('axios');
const { BirdList } = require("../models/birdList.js")


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

module.exports = {
    mapRouter,
  }