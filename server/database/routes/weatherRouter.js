const { Router } = require('express');
const weatherRouter = Router();
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
const axios = require('axios');

//////////////////////WEATHER//////////////////////

weatherRouter.get('/', (req, res) => {
    let lat = 29.9430
    let lng = -90.3517
  
    if(req.query.coordinates){
      const { coordinates } = req.query;
      const coords = JSON.parse(coordinates);
      lat = coords.lat;
      lng = coords.lng
    }
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&lang=en&exclude=minutely,hourly,alerts&appid=${process.env.WEATHER}`)
    .then(({ data } ) => res.json(data))
    .catch((err) => res.sendStatus(500));
  })


module.exports = {
    weatherRouter,
  }