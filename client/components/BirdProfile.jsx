// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Create Functional Component
const BirdProfile = ({bird, userId}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    
  })

  // Create Checkbox Click Handler
  const handelCheckboxClick = () => {
    console.log(bird._id, userId)
    if (!checked === true) {
      setChecked(true);
      axios.post('api/birdsightings', {params: { bird_id: bird._id, user_id: userId}})
        .then(() => console.log("Bird Sightings Post Successful"))
        .catch((err) => console.error('Bird Sightings Post Error: ', err));
    } else {
      setChecked(false);
      axios.post('api/birdsightings', {params: { bird_id: bird._id, user_id: userId}})
        .then(() => console.log("Bird Sightings Post Successful"))
        .catch((err) => console.error('Bird Sightings Delete Error: ', err));
    }
  };

  // Return Component Template
  return (
    <div className="block">
      <input type="checkbox" checked={checked} onChange={handelCheckboxClick}/>
      {/* <div> BirdId:{bird._id} userId:{userId}</div> */}
      <div className="message-header" >Common Name: {bird.commonName}</div>
      <ul>
        <li>Scientific Name: {bird.scientificName}</li>
        <li>Common Family Name: {bird.commonFamilyName}</li>
        <li>Scientific Family Name: {bird.scientificFamilyName}</li>
        <li>Order: {bird.order}</li>
        {/* <li>{birdSound}</li> */}
        {/* <li>{birdImg}</li> */}
      </ul>
    </div>
  );
};

// Export Component
export default BirdProfile;