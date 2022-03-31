// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Create Functional Component
const BirdProfile = () => {
  const [checked, setChecked] = useState(false);

  return (

    <>
      <h1 className="Header" alignment="center">
        Bird Profile
      </h1>
      <p>
        An individual bird 
      </p>
    </>
  );
};

export default BirdProfile;