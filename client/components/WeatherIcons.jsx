import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, Outlet } from "react-router-dom";

const WeatherIcons = ({weatherData}) => {
    // const [temp, setTemp] = useState(0);
    // const [humidity, setHumidity] = useState(0);
    // const [weatherId, setWeatherId] = useState(0);
    // const [clouds, setClouds] = useState(0);
    // const [forecast, setForecast] = useState([]);

    // const weatherId = weatherData.data.current.weather[0].id;
    const weatherId = 256;
    let weatherCode = '';
const icons = {
    thunderstorm: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png',
    drizzling:'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png',
    raining: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png',
    snowy: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png',
    notIdeal: 'it is not ideal for hiking',
    clear: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png',
    cloudy: 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'
}
if(weatherId >= 200 && weatherId < 300) weatherCode = icons.thunderstorm;
if(weatherId >= 300 && weatherId < 400) weatherCode = icons.drizzling;
if(weatherId >= 500 && weatherId < 600) weatherCode = icons.raining;
if(weatherId >= 600 && weatherId < 700) weatherCode = icons.snowy;
if(weatherId > 700 && weatherId < 800) weatherCode = icons.notIdeal;
if(weatherId === 800) weatherCode = icons.clear;
if(weatherId > 800 && weatherId < 900) weatherCode = cloudy;

console.log(icons.thunderstorm);
  return (
    <div id='icon' class='weather' align='center'>
        <img className="weather-icons" src={weatherCode} />
    </div>
  );
};

export default WeatherIcons;