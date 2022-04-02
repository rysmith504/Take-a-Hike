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

  useEffect(() => {
    axios.get("/api/birdList")
      .then((response) => {
        console.log("API Called")
        setBirdList(response.data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      })
  }, []);

  const handelBirdSearchInput = (event) => {
    const { value } = event.target;
    console.log(value);
    setBirdSearch(() => value);
  };

  const handelBirdSearchSubmit = (event) => {
    event.preventDefault();
    axios.get("/api/birdList", {
      params: { name: birdSearch }
    })
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
            return <BirdProfile bird={bird} key={bird.scientificName} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BirdingCheckList;