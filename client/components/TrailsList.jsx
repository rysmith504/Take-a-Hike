import React, { useEffect, useState } from "react";
import TrailsListEntry from './TrailsListEntry.jsx'


const TrailsList = ({dummyData}) => {

  const [location, setLocation] = useState({ lat: "", lon: ""})

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocation((location) => {
      return {...location, [name]: value, [name]: value}
    })
    console.log(location);
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
              onChange={handleChange}
              name="lat"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="lon"
              className="card"
              value={location.lon}
              onChange={handleChange}
              name="lon"
            />
          </label>
          <input
            type="submit"
            value="Send Location"
            // onClick={this.handleLocation}
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