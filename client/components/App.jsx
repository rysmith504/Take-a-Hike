// Import Dependencies
import React from "react";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
>>>>>>> 7bf66ca3c53ab8ba81ada773b37d0b8bff78e9a7

// import { useEffect, useState } from 'react';
// import Login from './Login.jsx';
import TrailProfile from "./TrailProfile.jsx";
// Import Components
// import Login from "./Login.jsx"
import Quartermaster from "./Quartermaster.jsx"
// import Trails from "./Trails.jsx"
import TrailsList from "./TrailsList.jsx"
import TrailsListEntry from "./TrailsListEntry.jsx"
import UserProfile from "./UserProfile.jsx"
import BirdingCheckList from "./BirdingCheckList.jsx";
// import TrailFeathers from './TrailFeathers.jsx';
// import TrailCard from './TrailCard.jsx'; // COMMENTED OUT BY RENE



const App = () => {
console.log('testing')
  return (
    <div>
      <h1 className="Header" alignment="center">
        Take a Hike in Louisiana
      </h1>
      <h2>All parks within 500 miles radius</h2>
      {/* <Login/> */}
      {/* <UserProfile/> */}
      <TrailsList />
      {/* <Trails />
      <TrailFeathers /> */}
      {/* <BirdingCheckList /> */}
      <Quartermaster/>
      <TrailProfile />
      {/* <Link to="/login">Login</Link> */}
      {/* <Routes>
        <Route path="/" element={<TrailsList />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="trail/:id" element={<TrailProfile />} />
      </Routes> */}
    </div>
  );
};

export default App;



// function App() {
//   return (
//     <Router>
//       <div className="container">
//       <Navbar />
//       <br/>
//       <Route path="/" exact component={TrailsList} />
//       <Route path="/quartermaster" component={Quartermaster} />
//       <Route path="/birding-checkList" component={BirdingCheckList} />
//       <Route path="/user-profile" component={UserProfile} />
//       </div>
//     </Router>
//   );
// }