// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import Login from "./Login.jsx"

// Import Components
// import Login from "./Login.jsx"
import Quartermaster from "./Quartermaster.jsx"
import Trails from "./Trails.jsx"
import TrailsList from "./TrailsList.jsx"
import TrailsListEntry from "./TrailsListEntry.jsx"
import UserProfile from "./UserProfile.jsx"
import BirdingCheckList from "./BirdingCheckList.jsx";

import { dummyParkData } from "../../copyAPIparkData/dummyDataCopy.js";

const App = () => {

//   const [trail, setTrail] = useState({firstTrail: {}, trails: []});
//   // const [count, setCount] = useState(0);
//   //initial state will be an empty object

//   // console.log(trail);
// //get request


//   const trailsData = () => {
//     setTrail((trail) => {
//       return {...trail, count: 1 }
//     })
//   }

  return (
    <>
    <Login/>
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
    </>
  );
};

export default App;
