import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, Outlet } from "react-router-dom";
const moment = require('moment');
const WeatherIcons = ({weatherData}) => {
    
const icons = {
    thunderstorm: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png',
    drizzling:'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png',
    raining: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png',
    snowy: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png',
    notIdeal: 'it is not ideal for hiking',
    clear: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png',
    cloudy: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'
}
let weatherCode = '';
const dayCode = weatherData.map((day, index) => {
    const timestamp = day.dt;
    const weatherId = day.weather[0].id;
    const highTemp = Math.floor(day.temp.max);
    const lowTemp = Math.floor(day.temp.min);
    const dayMoment = moment.unix(timestamp).format('ddd');
    let todayClass = '';
    if(!index) todayClass = 'has-text-info'
    if(weatherId >= 200 && weatherId < 300) weatherCode = icons.thunderstorm;
    if(weatherId >= 300 && weatherId < 400) weatherCode = icons.drizzling;
    if(weatherId >= 500 && weatherId < 600) weatherCode = icons.raining;
    if(weatherId >= 600 && weatherId < 700) weatherCode = icons.snowy;
    if(weatherId > 700 && weatherId < 800) weatherCode = icons.notIdeal;
    if(weatherId === 800) weatherCode = icons.clear;
    if(weatherId > 800 && weatherId < 900) weatherCode = icons.cloudy;

    return (
    <div className="column">
    <div id='icon' className='weather' >
        <p className ={todayClass}>{dayMoment}</p>
        <img className="weather-icons" src={weatherCode} />
        <p className ={todayClass}><strong className ={todayClass}>{highTemp}°</strong> <em>{lowTemp}°</em></p>
    </div>
  </div>
  )
})

  return (
  <div className="columns">
    {dayCode}
  </div>
  );
};

export default WeatherIcons;