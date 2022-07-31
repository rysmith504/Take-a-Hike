import React, { useState, useEffect } from 'react';
import TripsListEntry from "./TripsListEntry.jsx";
import axios from "axios";

const TripsList = () => {
  const [pastTrips, setPastTrips] = useState([]);
  const [tripsList, setTripsList] = useState([]);
  const [today, setToday] = useState([]);
  const [user_id, setUserId] = useState({user_id: null});
  const [deleteMsg, setDeleteMsg] = useState(false);
  
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

  useEffect(() => {
    getTrips(1);
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

  const deleteTrip = async (eventId) => {
    console.log('delete this trip');
    await axios.delete('/api/trips', {
      params: { _id: eventId }
    })
    .then(() => console.log('success'))
    .catch((err) => {
      console.error('ERROR: ', err);
    });
    setDeleteMsg(!deleteMsg);
    getTrips(1);
  };
  
  // FUTURE FEATURE: editing trips
  // const updateTrip = (e) => {
  //   const value = e.target.getAttribute('id');
  //   console.log(value);
  // };

  return (
    <div>
      <br></br>
      <h3
        className="content has-text-centered"
        padding="20px 40px"
        margin-left="40px"
      >
        Your Upcoming Trips
      </h3>
      <br></br>
      <div>
        <div>
          {tripsList.map((trip) => {
            return <TripsListEntry trip={trip} key={trip._id} deleteTrip={deleteTrip}/>;
          })}
        </div>
      </div>
      <br></br>
      <h3
        className="content has-text-centered"
        padding="20px 40px"
        margin-left="40px"
      >
        Your Past Trips
      </h3>
      <br></br>
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
