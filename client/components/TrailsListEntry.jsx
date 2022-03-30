import React from "react";
import { useEffect, useState } from "react";

const TrailsListEntry = ({trail}) => {
  return (
    <>
      <h1 className="Header" alignment="center">
        Trails
      </h1>
      <h2>Everything you want to know about a particular trail!</h2>
      {/* <div className='trail-row'>
      <div className='trail-data'>{trail.name}</div>
      <div className='trail-data'>{trail.city}</div>
      <div className='trail-data'>{trail.region}</div>
      <div className='trail-data'>{trail.rating}</div>
    </div> */}
    </>
  );
};

export default TrailsListEntry;
