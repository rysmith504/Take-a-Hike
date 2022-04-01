import React from "react";
import { useEffect, useState } from "react";


const UserProfile = ({ packingListNames }) => {
  return (
    <>
      <h1 className="Header" alignment="center">
        UserProfile
      </h1>
      <div>Username:</div>
      {packingListNames.map((listName) => {
        return <li>{listName}</li>;
      })}
    </>
  );
};

export default UserProfile;
