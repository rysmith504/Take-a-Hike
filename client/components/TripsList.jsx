import React, { useState, useEffect } from 'react';
import TripsListEntry from "./TripsListEntry.jsx";
import axios from "axios";

const TripsList = () => {
  const [pastTrips, setPastTrips] = useState([]);
  const [tripsList, setTripsList] = useState([]);
  const [today, setToday] = useState([]);
  const [userId, setUserId] = useState({userId: null});
  useEffect(() => {
    setToday(new Date());
    axios
    .get("/profile")
    .then((profile) => {
      const user = profile.data;
      setUserId((state) => {
        return { ...state, userId: user._id };
      });
    })
    .then(() => {
      // GET trips list based on logged in user id
      axios.get('/api/trips/pastTrips', {
        params: { userId }
      })
        .then((response) => {
          console.log('got trips');
          setPastTrips(response.data);
        })
        .catch((err) => {
          console.error('ERROR: ', err);
        });
        axios.get('/api/trips', {
          params: { userId }
        })
        .then((response) => {
          console.log('got trips');
          setTripsList(response.data);
        })
        .catch((err) => {
          console.error('ERROR: ', err);
        });
    })
    .catch((err) => {
      console.error("ERROR:", err);
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
