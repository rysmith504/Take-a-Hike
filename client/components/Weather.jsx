import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);

  const getWeather = () => {
    axios.get('/api/weather')
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }
  
  getWeather()

  return (
    <div>
      HELLOOOOOO
    </div>
  )
}

export default Weather;