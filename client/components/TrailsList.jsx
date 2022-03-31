import React, { useEffect, useState } from "react";
import TrailsListEntry from './TrailsListEntry.jsx';
import axios from 'axios';

const TrailsList = ({dummyData}) => {

  const [location, setLocation] = useState({ lat: "", lon: ""});
  const [trailList, setTrailList] = useState([]);

  const handleLocationInput = (e) => {
    const { name, value } = e.target
    setLocation((location) => {
      return {...location, [name]: value, [name]: value}
    })
  }

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    axios.get('/api/TrailsList', {params: { lat: location.lat, lon: location.lon }} )
    .then((arrayOfObj) => {
      console.log('Line 21 = ', arrayOfObj);
      setTrailList((trailList) => {
        return [...trailList, ...arrayOfObj]
      })
    })
    .catch((err) => {
      console.error('ERROR:', err);
    })
  }

  return (
    <div className='trails-list'>
      <h1 className="Header" alignment="center">Trails List</h1>
      <h2>A list of all the hiking trails in Louisiana!</h2>
      <form className="card">
          <label>
            <input
              type="text"
              placeholder="lat"
              className="card"
              value={location.lat}
              onChange={handleLocationInput}
              name="lat"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="lon"
              className="card"
              value={location.lon}
              onChange={handleLocationInput}
              name="lon"
            />
          </label>
          <input
            type="submit"
            value="Send Location"
            onClick={handleSubmitLocation}
          />
        </form>
      <div className='trails'>
        <div className='trail-table'>
          {
            dummyData.map(trail => {
              return <TrailsListEntry
                trail={ trail }
                key={trail.id}
              />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default TrailsList;