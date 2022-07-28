import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import moment from 'moment'

import { OutlinedInput, ThemeProvider, createTheme, Fab, Typography, Grid, Paper} from '@mui/material'

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Roboto',
    },
    t: {
      fontFamily: 'Roboto'
    },
    h5: {
      fontFamily: 'Roboto',
      fontColor: 'white'
    }
  },
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#209CEE',
      darker: '#5e35b1',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

// const sdk = require('api')('@climacell-docs/v4#bzqumkyn13ppf');



const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weatherId, setWeatherId] = useState(0);
  const [clouds, setClouds] = useState(0);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [coordinates, setCoordinates] = useState({});


  const handleCity = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  const handleState = (e) => {
    console.log(e.target.value);
    setState(e.target.value);
  }

  const handleLocation = () => {
    axios.get('/api/map/latLng', {
      params: {
        city: `${city}, ${state}`
      }
    })
    .then((location) => {
      console.log(location.data);
      setCoordinates(location.data);
      axios.get('/api/weather', {
        params: {
          coordinates: location.data,
        }
      })
        .then((weatherObj) => {
          console.log(weatherObj);
          setClouds(weatherObj.data.current.clouds);
          setTemp(weatherObj.data.current.temp)
          setHumidity(weatherObj.data.current.humidity);
          setWeatherId(weatherObj.data.current.weather[0].id)
          setForecast(weatherObj.data.daily)
        })
        .catch((err) => console.error(err))
      })
    .catch((err) => {
      console.error(err);
    })
  }

  if (temp) {
    return (
      <div>
        <ThemeProvider theme={theme}>
            <form align='center' style={{ marginTop: '10px' }}>
              <OutlinedInput style={{marginLeft: '5px', marginRight: '5px'}} size='small' type='text' placeholder='city' onChange={(e) => handleCity(e)} value={city}/>
              <OutlinedInput style={{marginLeft: '5px', marginRight: '5px'}} size='small' type='text' placeholder='state' onChange={(e) => handleState(e)} value={state}/>
              <div style={{marginTop: '5px'}}>
                <Typography color='neutral'>
                <Fab color='primary' variant='extended' size='small' onClick={handleLocation}>
                  enter
                </Fab>
                </Typography>
              </div>
            </form>

          
    
          <div align='center' style={{marginTop: '20px'}} id='day' class='weather'>
            <Typography variant='h5'>
              {`${ moment().format('MMMM Do YYYY')} `}
            </Typography>
          </div>
          <div class='weather' align='center'>
          {(weatherId >= 200 && weatherId < 300) ? <img width='100' height ='100' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png'/> : ''}
            {(weatherId >= 300 && weatherId < 400) ? <img width='100' height ='100' src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png'/> : ''}
            {(weatherId >= 500 && weatherId < 600) ? <img width='100' height ='100' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png'/> : ''}
            {(weatherId >= 600 && weatherId < 700) ? <img width='100' height ='100' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png'/> : ''}
            {(weatherId > 700 && weatherId < 800) ? 'it is not ideal for hiking' : ''}
            {(weatherId === 800) ? <img width='100' height ='100' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png'/> : ''}
            {(weatherId > 800 && weatherId < 900) ? <img width='100' height ='100' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'/> : ''}
          </div>

          <div align='center'>
          <div id='sky' class='weather'>
              {(weatherId >= 200 && weatherId < 300) && 'there is a thunderstorm'}
              {(weatherId >= 300 && weatherId < 400) && 'it is drizzling'}
              {(weatherId >= 500 && weatherId < 600) && 'it is raining'}
              {(weatherId >= 600 && weatherId < 700) && 'it is snowy'}
              {(weatherId > 700 && weatherId < 800) && 'it is not ideal for hiking'}
              {(weatherId === 800) && 'the sky is clear'}
              {(weatherId > 800 && weatherId < 900) && `it is ${clouds} % cloudy`}
            </div>

            <div id='temp' class='weather'>
            The current temperature is <b>{temp}</b> degrees fahrenheit 
            </div>
      
            <div id='humidity' class='weather' style={{marginBottom: '30px'}}>
              Humidity is at <b>{humidity}%</b>
            </div>


            <div>

                <b>8-DAY FORECAST</b>
              <Grid justifyContent='center' spacing='10' container>
                {forecast.map((day, i) =>
                (
                  <Grid item md={1}>
                    <Paper variant='outlined' sx = {{backgroundColor: '#85EBFF', opacity: '.8'}}>
    
                     
                      {`${moment().add(i + 1, 'days').format('dddd MMMM Do')}`}
                      <div>

                      {(day.weather[0].id >= 200 && day.weather[0].id < 300) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/flash-cloud-256.png'/> : ''}
                      {(day.weather[0].id >= 300 && day.weather[0].id < 400) ? <img height='30' width='30' src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-256.png'/> : ''}
                      {(day.weather[0].id >= 500 && day.weather[0].id < 600) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-512.png'/> : ''}
                      {(day.weather[0].id >= 600 && day.weather[0].id < 700) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/snow-cloud-512.png'/> : ''}
                      {(day.weather[0].id > 700 && day.weather[0].id < 800) ? 'it is not ideal for hiking' : ''}
                      {(day.weather[0].id === 800) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png'/> : ''}
                      {(day.weather[0].id > 800 && day.weather[0].id < 900) ? <img height='30' width='30' src='https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-256.png'/> : ''}
                      </div>

                      <div>
                        H: {day.temp.max}
                      </div>

                      <div>
                        L: {day.temp.min}
                      </div>

                      <div>
                        <img src='https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami9-72-256.png' height='15' width='15'/> {day.wind_speed} mph
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>

            </div>

            </ThemeProvider>
      </div>
    )

  } else {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <form align='center' style={{ marginTop: '10px' }}>
                <OutlinedInput style={{marginLeft: '5px', marginRight: '5px'}} size='small' type='text' placeholder='city' onChange={(e) => handleCity(e)} value={city}/>
                <OutlinedInput style={{marginLeft: '5px', marginRight: '5px'}} size='small' type='text' placeholder='state' onChange={(e) => handleState(e)} value={state}/>
                <div style={{marginTop: '5px'}}>
                  <Fab color='primary' variant='extended' size='small' onClick={handleLocation}>
                    enter
                  </Fab>
                </div>
          </form>
        </ThemeProvider>
      </div>
    )
  }
}

export default Weather;