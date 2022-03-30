import React, { useEffect, useState } from "react";
import TrailsListEntry from './TrailsListEntry.jsx'
import { dummyParkData } from "../../copyAPIparkData/dummyDataCopy";

const TrailsList = () => {

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
            dummyParkData.map((trail) => (
              <TrailsListEntry
                trail={ trail }
                key={trail.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TrailsList;