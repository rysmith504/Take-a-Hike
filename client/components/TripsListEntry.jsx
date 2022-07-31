import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcons from "./WeatherIcons.jsx";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotesIcon from '@mui/icons-material/Notes';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const moment = require('moment');
const TripsListEntry = ({ trip, deleteTrip }) => {
let current = moment();
let sevenDays = moment().add(7, 'days');
const [coordinates, setCoordinates] = useState([]);
const [weatherData, setWeatherData] = useState([0]);
const [deletedTrip, setDeletedTrip] = useState(false);

useEffect(() => {
// if a trip is within seven days from now
if(moment(trip.tripDate).isBetween(current, sevenDays)){
// get the coordinates from Google API
// use those coordinates to get the weather forecast
axios.get('/api/map/latLng', {
params: {
'city': trip.tripLocation,
}})
.then((response) => {
setCoordinates(response.data);
axios.get('/api/weather', {
params: {'coordinates': response.data}})
.then((weather) => setWeatherData(weather.data.daily))
.catch((err) => console.error(err));
})
.catch((err)=>console.error(err))
}
}, []);

const handleDelete = (e) => {
  console.log('delete this trip');
  const value  = e.target.getAttribute('id');
  console.log(value);
  deleteTrip(value);
  setDeletedTrip(!deletedTrip);
  document.getElementById(value).remove();
};

const img = `https://source.unsplash.com/random/400x200?${trip.tripLocation}`

return (
<div className="trip-card" id={trip._id}>
  <div className="list-item-card">
    <div className="info-group">
      <div className="column is-four-fifths">
        <h3>{trip.tripName}</h3>
      </div>
      {/* <div className="column" id={trip._id}>
        <Tooltip title="Edit Trip">
        <IconButton onClick={updateTrip} id={trip._id}>
          <i id={trip._id} class="fa fa-pencil"></i>
          </IconButton>
        </Tooltip>
      </div> */}
      <div className="column" id={trip._id}>
      <Tooltip title="Delete Trip">
          <IconButton onClick={handleDelete} id={trip._id}>
          <i id={trip._id} class="fa fa-trash"></i>
          </IconButton>
        </Tooltip>
      </div>
    </div>
    <img src={img} height="200px" width="600px"/>
    <div className="info-group">
      <NotesIcon/><p><strong>Description:</strong> {trip.tripDescription}</p>
    </div>
    <div className="info-group">
    <LocationOnIcon/><p><strong>Location:</strong> {trip.tripLocation}</p>
    </div>
    <div className="info-group">
      <MapIcon/><p><strong>Address:</strong> {trip.tripAddress}</p>
    </div>
    <div className="info-group">
      <CalendarMonthIcon/><p><strong>Date:</strong> {moment(trip.tripDate).format('ll')}</p>
    </div>
    <div className="info-group">
      { moment(trip.tripDate).format('L') > moment().format('L')
      ? <p><em>Your next trip is {moment(trip.tripDate, "YYYYMMDD").fromNow()}.
        </em></p>
      : <p><em>Your trip was {moment(trip.tripDate, "YYYYMMDD").fromNow()}.
        </em></p>
      }
    </div>
    <div className="info-group">
    </div>
    {weatherData.length > 1 ?
    <WeatherIcons weatherData={weatherData} /> : ''}
  </div>
</div>
);
};


export default TripsListEntry;