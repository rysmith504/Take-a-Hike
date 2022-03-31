// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

// Import Components
import Login from "./Login.jsx"
import Quartermaster from "./Quartermaster.jsx";
import BirdingCheckList from "./BirdingCheckList.jsx";
import Trails from "./Trails.jsx";
import TrailsList from "./TrailsList.jsx";
import UserProfile from "./UserProfile.jsx";

const App = () => {
  return (
    <>
    <Login/>
      <h1 className="Header" alignment="center">
        Take a Hike in Louisiana
      </h1>
      <h2>All parks within 500 miles radius</h2>
      {/* <Login/> */}
      {/* <UserProfile /> */}
      <Quartermaster />
      {/* <Trails />
      <TrailFeathers /> */}
    </>
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