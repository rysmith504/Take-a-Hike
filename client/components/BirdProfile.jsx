// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Create Functional Component
const BirdProfile = ({bird}) => {
  const [checked, setChecked] = useState(false);



  return (
    <div className="trail-card">
      <input type="checkbox" />
      <div>Scientific Name: {bird.scientificName}</div>
      <div>Common Name: {bird.commonName}</div>
      <div>Common Family Name: {bird.commonFamilyName}</div>
      <div>Scientific Family Name: {bird.scientificFamilyName}</div>
      <div>Order: {bird.order}</div>
      <div>Catagory: {bird.category}</div>
      {/* <div>{bird.sound}</div> */}
    </div>
  );
};

export default BirdProfile;