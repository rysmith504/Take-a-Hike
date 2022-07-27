import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const moment = require('moment');
const TripsListEntry = ({ trip }) => {
    let current = moment();
    let sevenDays = moment().add(7, 'days');

    // if a trip is within seven days from now
    if(moment(trip.tripDate).isBetween(current, sevenDays)){
      // get the coordinates from Google API
      // use those coordinates to get the weather forecast
      axios.get('/api/latLng', {
        params: {
        'city': trip.tripLocation,
      }})
      .then((response) => {
        console.log(response.data);
        app.get('/api/weather'
      })
      .catch(()=>{

      })
   }
  return (
    <div>
      <div className="trip-card">
        <div className="list-item-card">
          <h3>{trip.tripName}</h3>
          <div className="info-group">
            <p>Description: {trip.tripDescription}</p>
          </div>
          <div className="info-group">
            <p>Location: {trip.tripLocation}</p>
          </div>
          <div className="info-group">
            <p>Address: {trip.tripAddress}</p>
          </div>
          <div className="info-group">
            <p>Date: {moment(trip.tripDate).format('ll')}</p>
          </div>
          <div className="info-group">
            { moment(trip.tripDate).format('L') > moment().format('L') 
            ? <p><em>Your next trip is {moment(trip.tripDate, "YYYYMMDD").fromNow()}.
            </em></p> 
            : <p><em>Your trip was {moment(trip.tripDate, "YYYYMMDD").fromNow()}.
            </em></p> 
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsListEntry;
