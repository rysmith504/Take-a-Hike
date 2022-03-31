// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import BirdProfile from "./BirdProfile.jsx";

// Create Functional Component
const BirdingCheckList = () => {
  const [birdSearch, setBirdSearch] = useState("");
  const [birdList, setBirdList] = useState(false);

  const handelBirdSearchInput = (event) => {
    const { name, value } = event.target;
    setBirdSearch((birdSearch) => {
      return { ...birdSearch, [name]: value};
    });
  };

  const handelBirdSearchSubmit = (event) => {
    event.preventDefault();
    axios.get("/api/birdList")
      .then((response) => {
        setBirdList(() => {
          return [...response.data.data]
        });
      })
      .catch((err) => {
        console.error("ERROR:", err);
      })
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
            name="lat"
          />
        </label>
        <input
          type="submit"
          value="Send Bird"
          onClick={handelBirdSearchSubmit}
        />
      </form>
      <div className="birds">
        <div className="bird-profile">
          {birdList.map((bird) => {
            return <BirdProfile bird={bird} key={bird.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BirdingCheckList;