import React, { useEffect, useState } from "react";
import TrailsListEntry from './TrailsListEntry.jsx'


const TrailsList = ({trails, dummyData}) => {

  console.log('Dummy length', dummyData.length);

  return (
    <div className='trails-list'>
      <h1 className="Header" alignment="center">Trails List</h1>
      <h2>A list of all the hiking trails in Louisiana!</h2>
      <div className='trails'>
        <div className='trail-table'>
          <div className='trail-header trail-row'>
            <div className='trail-data'>Trail Name</div>
            <div className='trail-data'>City</div>
            <div className='trail-data'>State</div>
            <div className='trail-data'>Rating</div>
          </div>
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