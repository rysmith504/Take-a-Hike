import ENV from '../../map.env';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);
  let lat = 29.9430
  let lon = -90.3517
  const getWeather = () => {
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&lang=en&exclude=minutely,hourly,alerts&appid=${ENV.WEATHER}`)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

getWeather()

  return (
    <div>
      HELLOOOOOO
    </div>
  )
}

export default Weather;