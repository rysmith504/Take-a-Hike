import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TripsListEntry = ({ trip }) => {
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
            <p>tripDate: {trip.tripDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsListEntry;
