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
    // console.log(bird._id, userId)
    // axios.post('api/birdSightings', {params: { bird_id: bird._id, user_id: userId}})
    //   .then(() => setChecked(true))
    //   .catch((err) => console.error('ERROR: ', err));
    if (!checked === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  // Return Component Template
  return (
    <div className="list-item-card">
      <input type="checkbox" checked={checked} onChange={handelCheckboxClick}/>
      {/* <div> BirdId:{bird._id} userId:{userId}</div> */}
      <div>Common Name: {bird.commonName}</div>
      <div>Common Family Name: {bird.commonFamilyName}</div>
      <div>Scientific Name: {bird.scientificName}</div>
      <div>Scientific Family Name: {bird.scientificFamilyName}</div>
      <div>Order: {bird.order}</div>      {/* <div>{birdSound}</div> */}
      {/* <div>{birdImg}</div> */}
    </div>
  );
};

// Export Component
export default BirdProfile;