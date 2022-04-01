// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Create Functional Component
const BirdProfile = ({bird}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <input type="checkbox" />
      <div>Scientific Name: {bird[0]}</div>
      <div>Common Name: {bird[1]}</div>
      <div>Common Family Name: {bird[2]}</div>
      <div>Scientific Family Name: {bird[3]}</div>
      <div>Order: {bird[4]}</div>
      <div>Catagory: {bird[5]}</div>
      {/* <div>{bird.sound}</div> */}
    </div>
  );
};

export default BirdProfile;