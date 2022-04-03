import React, { useEffect, useState } from 'react';
import TrailsListEntry from './TrailsListEntry.jsx';
<<<<<<< Updated upstream
import axios from 'axios';
// import TrailCard from './TrailCard.jsx';

const TrailsList = ({ handleGetTrails, trailList }) => {
  const [location, setLocation] = useState({ lat: '', lon: '' });
  // const [trailList, setTrailList] = useState([]);

  const handleLocationInput = (e) => {
    const { name, value } = e.target;
    setLocation((location) => {
      return { ...location, [name]: value, [name]: value };
    });
  };

  // moving handlesubmitlocation to App.jsx component
  // const handleSubmitLocation = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get("/api/trailslist", {
  //       params: { lat: location.lat, lon: location.lon },
  //     })
  //     .then((response) => {
  //       // console.log("Line 24 = ", response.data.data); - returns array of objects of trail data
  //       setTrailList(() => {
  //         return [...response.data.data]
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("ERROR: ", err);
  //     });
  //   };

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    handleGetTrails(location);
  };

=======
import { dummyParkData } from '../../copyAPIparkData/dummyDataCopy';

const TrailsList = () => {
>>>>>>> Stashed changes
  return (
    <div className="profile-card">
      <h1 className="Header" alignment="center">
        Trails List
      </h1>
<<<<<<< Updated upstream
      <form onSubmit={handleSubmitLocation} className="card">
        <label>
          <input
            type="text"
            placeholder="latitude"
            className="card"
            value={location.lat}
            onChange={handleLocationInput}
            name="lat"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="longitude"
            className="card"
            value={location.lon}
            onChange={handleLocationInput}
            name="lon"
          />
        </label>
        <input type="submit" value="Send Location" />
      </form>
      <div className="trails">
        <div className="trail-table">
          {trailList.map((trail) => {
            return <TrailsListEntry trail={trail} key={trail.id} />;
          })}
=======
      <h2>A list of all the hiking trails in Louisiana!</h2>
      <div className="trails">
        <div className="trail-table">
          <div className="trail-header trail-row">
            <div className="trail-data">Trail Name</div>
            <div className="trail-data">City</div>
            <div className="trail-data">State</div>
            <div className="trail-data">Rating</div>
          </div>
          {dummyParkData.map((trail) => (
            <TrailsListEntry trail={trail} key={trail.id} />
          ))}
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default TrailsList;
