// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Create Functional Component
const BirdProfile = ({bird}) => {
  const [checked, setChecked] = useState(false);

  // // const handelCheckboxClick = () => {
  //   if (!checked === true) {
  //     setChecked(true);
  //   } else {
  //     setChecked(false);
  //   }
  // };

  return (
    <div className="list-item-card">
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


// const handelCheckboxClick = () => {
//   console.log('Line 11 - Checked: ', checked);
//   if(!checked) {
//    setChecked(true);
//   //   // axios.post('api/birdSightings', {params: { bird_id: , user_id: }})
//   //   //   .then(() => setChecked(true))
//   //   //   .catch((err) => console.error('ERROR: ', err));
//   } else {
//     setChecked('false');
//   // //   axios.delete('api/birdSightings', {params: { search: birdSearch }})
//   // //     .then(() => setChecked(false))
//   // //     .catch((err) => console.error('ERROR: ', err));
//   // }
// }

// return (
//   <div className="trail-card">
//     <input type="checkbox" checked={checked} onChange={handelCheckboxClick} />