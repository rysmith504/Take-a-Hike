import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const getWeather = () => {
    axios.get('/api/weather')
      .then((weatherObj) => {
        console.log(weatherObj);
        setTemp(weatherObj.data.current.temp)
        setHumidity(weatherObj.data.current.humidity);
      })
      .catch((err) => console.error(err))
  }
  
  useEffect(() => {
    getWeather();
  })

  console.log(temp);

  return (
    <div>
      <div id='temp' class='weather'>
      The current temperature is {temp} degrees fahrenheit 
      </div>

      <div id='humidity' class='weather'>
        Humidity is at {humidity} %
      </div>

    

    </div>
  )
}

export default Weather;