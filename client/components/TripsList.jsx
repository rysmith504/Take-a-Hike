import React from 'react';
import TripsListEntry from "./TripsListEntry.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const TripsList = () => {
<<<<<<< HEAD
  const [pastTrips, setPastTrips] = useState([]);
  const [tripsList, setTripsList] = useState([]);
  const [today, setToday] = useState([]);
  useEffect(() => {
    setToday(new Date());
// GET trips list
    axios.get('/api/pastTrips')
      .then((response) => {
        console.log('got trips');
        setPastTrips(response.data);
      })
      .catch((err) => {
        console.error('ERROR: ', err);
      });

      axios.get('/api/trips')
=======
  const [tripsList, setTripsList] = useState([]);
  useEffect(() => {

// GET trips list
    axios.get('/api/trips')
>>>>>>> c32e64e5b48d6fd499fe5b70506d2f43cdb385b7
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
      <br></br>
      <h1 className="Header" alignment="center">
        Your Upcoming Trips
      </h1>
      <div>
        <div>
          {tripsList.map((trip) => {
            return <TripsListEntry trip={trip} key={trip._id} />;
          })}
        </div>
      </div>
      <br></br>
      <h1 className="Header" alignment="center">
        Your Past Trips
      </h1>
      <div>
        <div>
          {pastTrips.map((trip) => {
            return <TripsListEntry trip={trip} key={trip._id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TripsList;