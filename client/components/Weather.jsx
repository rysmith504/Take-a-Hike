import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weatherId, setWeatherId] = useState(0);
  const [clouds, setClouds] = useState(0);

  const getWeather = () => {
    axios.get('/api/weather')
      .then((weatherObj) => {
        console.log(weatherObj);
        setClouds(weatherObj.data.current.clouds);
        setTemp(weatherObj.data.current.temp)
        setHumidity(weatherObj.data.current.humidity);
        setWeatherId(weatherObj.data.current.weather[0].id)
      })
      .catch((err) => console.error(err))
  }
  
  useEffect(() => {
    getWeather();
  }, [])

  return (
    <div>
      <div id='icon' class='weather' align='center'>
      {(weatherId >= 300 && weatherId < 400) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png'/> : ''}
        {(weatherId >= 400 && weatherId < 500) ? <img src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png'/> : ''}
        {(weatherId >= 500 && weatherId < 600) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png'/> : ''}
        {(weatherId >= 600 && weatherId < 700) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png'/> : ''}
        {(weatherId > 700 && weatherId < 800) ? 'it is not ideal for hiking' : ''}
        {(weatherId === 800) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png'/> : ''}
        {(weatherId > 800 && weatherId < 900) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'/> : ''}
      </div>

      <div id='temp' class='weather'>
      The current temperature is {temp} degrees fahrenheit 
      </div>

      <div id='humidity' class='weather'>
        Humidity is at {humidity} %
      </div>

      <div id='sky' class='weather'>
        {(weatherId >= 300 && weatherId < 400) ? 'there is a thunderstorm' : ''}
        {(weatherId >= 400 && weatherId < 500) ? 'it is drizzling' : ''}
        {(weatherId >= 500 && weatherId < 600) ? 'it is raining' : ''}
        {(weatherId >= 600 && weatherId < 700) ? 'it is snowy' : ''}
        {(weatherId > 700 && weatherId < 800) ? 'it is not ideal for hiking' : ''}
        {(weatherId === 800) ? 'the sky is clear' : ''}
        {(weatherId > 800 && weatherId < 900) ? `it is ${clouds} % cloudy` : ''}
      </div>




    </div>
  )
}

export default Weather;