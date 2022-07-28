import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import moment from 'moment'

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weatherId, setWeatherId] = useState(0);
  const [clouds, setClouds] = useState(0);
  const [forecast, setForecast] = useState([]);
  // const today = new Date();
  // const tomorrow = new Date(today)
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const getWeather = () => {
    axios.get('/api/weather')
      .then((weatherObj) => {
        console.log(weatherObj);
        setClouds(weatherObj.data.current.clouds);
        setTemp(weatherObj.data.current.temp)
        setHumidity(weatherObj.data.current.humidity);
        setWeatherId(weatherObj.data.current.weather[0].id)
        setForecast(weatherObj.data.daily)
      })
      .catch((err) => console.error(err))
  }
  
  useEffect(() => {
    getWeather();
  }, [])

  return (
    <div>
      <div id='day' class='weather'>
        {`${ moment().format('MMMM Do YYYY')} `}
      </div>
      <div id='icon' class='weather' align='center'>
      {(weatherId >= 200 && weatherId < 300) ? <img src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png'/> : ''}
        {(weatherId >= 300 && weatherId < 400) ? <img src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png'/> : ''}
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
        {(weatherId >= 200 && weatherId < 300) ? 'there is a thunderstorm' : ''}
        {(weatherId >= 300 && weatherId < 400) ? 'it is drizzling' : ''}
        {(weatherId >= 500 && weatherId < 600) ? 'it is raining' : ''}
        {(weatherId >= 600 && weatherId < 700) ? 'it is snowy' : ''}
        {(weatherId > 700 && weatherId < 800) ? 'it is not ideal for hiking' : ''}
        {(weatherId === 800) ? 'the sky is clear' : ''}
        {(weatherId > 800 && weatherId < 900) ? `it is ${clouds} % cloudy` : ''}
      </div>


          <div align='center'>
            FORECAST
          {forecast.map((day, i) =>
          (
          <div style={{marginBottom: '10px', backgroundColor: 'white', borderStyle: 'solid'}}>
            <span>
            {`${moment().add(i + 1, 'days').format('dddd MMMM Do')}`}
            <div>
            {(forecast[i].weather[0].id >= 200 && forecast[i].weather[0].id < 300) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png'/> : ''}
            {(forecast[i].weather[0].id >= 300 && forecast[i].weather[0].id < 400) ? <img height='30' width='30' src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png'/> : ''}
            {(forecast[i].weather[0].id >= 500 && forecast[i].weather[0].id < 600) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png'/> : ''}
            {(forecast[i].weather[0].id >= 600 && forecast[i].weather[0].id < 700) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png'/> : ''}
            {(forecast[i].weather[0].id > 700 && forecast[i].weather[0].id < 800) ? 'it is not ideal for hiking' : ''}
            {(forecast[i].weather[0].id === 800) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png'/> : ''}
            {(forecast[i].weather[0].id > 800 && forecast[i].weather[0].id < 900) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'/> : ''}
          </div>
          </span>

          </div>


          ))}



          </div>
        





    </div>
  )
}

export default Weather;