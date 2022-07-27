import React from 'react';
import TripsListEntry from "./TripsListEntry.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const TripsList = () => {
  const [tripsList, setTripsList] = useState([]);
  useEffect(() => {

// GET trips list
    axios.get('/api/trips')
      .then((response) => {
        console.log('got trips');
        setTripsList(response.data);
      })
      .catch((err) => {
        console.error('ERROR: ', err);
      });
  }, []);

  return (
    <div>
      <h1 className="Header" alignment="center">
        Your Upcoming Trips
      </h1>
      <div>
        <div>
          {tripsList.map((trip) => {
            return <TripsListEntry trip={trip} key={trip.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TripsList;