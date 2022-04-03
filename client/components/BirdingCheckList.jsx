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
  // const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get("/api/birdList")
      .then((response) => {
        console.log("API Called")
        setBirdList(response.data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });
    // axios.get('/profile')
    //   .then((profile) => {
    //     const user = profile.data;
    //     setUserId(user._id)
    //     console.log(userId);
    //   });
  }, []);

  const handelBirdSearchInput = (event) => {
    setBirdSearch(event.target.value);
  };

  // const handelBirdSearch = () => {
  //   // console.log(birdSearch);
  //   axios.get('/api/birdList/birdSearch', {params: { search: birdSearch }})
  //     .then((response) => console.log('Line 31 - handelBirdSearch : ', response))
  //     .catch((err) => {
  //       console.error('ERROR: ', err);
  //     });
  // };

  const handelBirdSearchSubmit = (event) => {
    event.preventDefault();
    setBirdList(birdList.filter(bird => bird.scientificName.toLowerCase().includes(birdSearch) || bird.commonName.toLowerCase().includes(birdSearch) || bird.commonFamilyName.toLowerCase().includes(birdSearch) || bird.scientificFamilyName.toLowerCase().includes(birdSearch))
    );
    console.log("Line 43 - BirdList: ", birdList);
    
  }

  return (
    <div className="birding-checklist">
      <h1 className="Header" alignment="center">
        Birding Checklist
      </h1>
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
        <div className="trail-profile">
          {birdList.map((bird) => {
            return <BirdProfile bird={bird} key={bird.scientificName + bird._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BirdingCheckList;