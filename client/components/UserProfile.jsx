import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


const UserProfile = ({ packingListNames }) => {

  const [profileName, setProfileName] = useState('');
  const [picture, setPicture] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('/profile')
    .then((profile) => {
      const user = profile.data;
      console.log(user)
      setProfileName(user.fullName)
      setPicture(user.picture)
      setEmail(user.email)
    });
  })
    
  
  
  return (
    <div>
      <h1>welcome {profileName}</h1>
      <a href={picture}></a>
      <p>{email}</p>
    </div>
  )

  // return (
  //   <>
  //     <h1 className="Header" alignment="center">
  //       UserProfile
  //     </h1>
  //     <div>Username:</div>
  //     {packingListNames.map((listName) => {
  //       return <li>{listName}</li>;
  //     })}
  //   </>
  // );
};

export default UserProfile;
