// Import Dependencies
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import { useEffect, useState } from 'react';
// import Login from './Login.jsx';
import TrailProfile from './TrailProfile.jsx';
// Import Components
// import Login from "./Login.jsx"
import Quartermaster from "./Quartermaster.jsx"
// import Trails from "./Trails.jsx"
import TrailsList from "./TrailsList.jsx"
import TrailsListEntry from "./TrailsListEntry.jsx"
import UserProfile from "./UserProfile.jsx"
import BirdingCheckList from "./BirdingCheckList.jsx";

import { dummyParkData } from "../../copyAPIparkData/dummyDataCopy.js";

// import TrailFeathers from './TrailFeathers.jsx';
// import TrailCard from './TrailCard.jsx'; // COMMENTED OUT BY RENE


const App = () => {

  return (
    <div>
      <h1 className="Header" alignment="center">
        Take a Hike in Louisiana
      </h1>
      <h2>All parks within 500 miles radius</h2>
      {/* <Login/> */}
      {/* <UserProfile/> */}
      <TrailsList  dummyData={dummyParkData}/>
      {/* <TrailsListEntry/> */}
      {/* <Trails/>
      <Quartermaster/>
      <BirdingCheckList /> */}
      <TrailProfile />
    </div>
  );
};

export default App;
