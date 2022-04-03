// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import BirdProfile from "./BirdProfile.jsx";

// Create Functional Component
const BirdingCheckList = () => {
  const [birdSearch, setBirdSearch] = useState("");
  const [birdList, setBirdList] = useState([]);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [birdSightings, setBirdSightings] = useState([]);


  // Call useEffect on Page Load
  useEffect(() => {
    axios.get("/api/birdList")
      .then((response) => setBirdList(response.data))
      .catch((err) => console.error("ERROR:", err));
    axios.get("/api/birdSightings")
      .then((response) => setBirdSightings(response.data))
      .catch((err) => console.error("ERROR:", err));
    axios.get('/profile')
      .then((profile) => {
          const user = profile.data;
          setUserId(user._id)
          setUserName(user.fullName)
      })
      .catch((err) => console.error("ERROR:", err));
  }, []);

  // Create Search Input Handler
  const handelBirdSearchInput = (event) => setBirdSearch(event.target.value);

  // Create Search Submit Handler
  const handelBirdSearchSubmit = (event) => {
    event.preventDefault();
    setBirdList(birdList
      .filter(bird => bird.scientificName.toLowerCase().includes(birdSearch) || 
        bird.commonName.toLowerCase().includes(birdSearch) || 
        bird.commonFamilyName.toLowerCase().includes(birdSearch) || 
        bird.scientificFamilyName.toLowerCase().includes(birdSearch))
      );    
  }

  // Return Component Template
  return (
    <div className="birding-checklist">
      <h1 className="profile-card" alignment="center">
        {userName}'s Birding Checklist
      </h1>
      <div>
        A one stop shop to keep track of all your Louisiana bird sightings! Louisiana is one of the most diverse and extraordinary ecosystems in the entire world, and there is no better way to celebrate and take part in it's splendor than spotting all the wonderful birds of our state. So get to hiking!
      </div>
      <form>
        <label>
          <input
            type="text"
            placeholder="Enter Bird Name Here"
            value={birdSearch}
            onChange={handelBirdSearchInput}
          />
        </label>
        <input
          type="submit"
          value="Check for Bird"
          onClick={handelBirdSearchSubmit}
        />
      </form>
      <div className="birds">
        <div className="profile-card">
          {birdList.map((bird) => {
            return <BirdProfile 
              bird={bird} 
              key={bird._id} 
              userId={userId} 
              birdSightings={birdSightings} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Export Component
export default BirdingCheckList;