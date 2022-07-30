import React, { useState, useEffect } from 'react';
import TripsListEntry from "./TripsListEntry.jsx";
import axios from "axios";

const TripsList = () => {
  const [pastTrips, setPastTrips] = useState([]);
  const [tripsList, setTripsList] = useState([]);
  const [today, setToday] = useState([]);
  const [user_id, setUserId] = useState({user_id: null});
  const [deleteMsg, setDeleteMsg] = useState(false);
  useEffect(() => {
    function getTrips(userId){
      // GET trips list based on logged in user id
      axios.get('/api/trips/pastTrips', {
        params: { user_id: userId }
      })
        .then((response) => {
          console.log('got trips');
          setPastTrips(response.data);
        })
        .catch((err) => {
          console.error('ERROR: ', err);
        });
        axios.get('/api/trips', {
          params: { user_id: userId }
        })
        .then((response) => {
          console.log('got trips');
          setTripsList(response.data);
        })
        .catch((err) => {
          console.error('ERROR: ', err);
        });
    }

    setToday(new Date());
    axios.get("/profile")
    .then((profile) => {
      const userId = profile.data._id;
      getTrips(userId);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });

  }, []);

  const deleteTrip = (eventId) => {
    console.log('delete this trip');
    axios.delete('/api/trips', {
      params: { _id: eventId }
    })
    .then(() => getTrips(1))
    .catch((err) => {
      console.error('ERROR: ', err);
    });
    setDeleteMsg(!deleteMsg);
  };
  
  // FUTURE FEATURE: editing trips
  // const updateTrip = (e) => {
  //   const value = e.target.getAttribute('id');
  //   console.log(value);
  // };

  return (
    <div>
      <br></br>
      <h1 className="Header" alignment="center">
        Your Upcoming Trips
      </h1>
      <div>
        <div>
          {tripsList.map((trip) => {
            return <TripsListEntry trip={trip} key={trip._id} deleteTrip={deleteTrip}/>;
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
            return <TripsListEntry trip={trip} key={trip._id} deleteTrip={deleteTrip}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default TripsList;
