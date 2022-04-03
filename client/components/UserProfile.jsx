import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [profileName, setProfileName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("/profile").then((profile) => {
      const user = profile.data;
<<<<<<< HEAD
      console.log(user);
      setProfileName(user.fullName);
      setPicture(user.picture);
      setEmail(user.email);
=======
      // console.log(user)
      setProfileName(user.fullName)
      setPicture(user.picture)
      setEmail(user.email)
>>>>>>> f42371aeed152890548a05511cc449f17c3f14ff
    });
  });

  return (
    <div className="profile-card">
      <h1>Welcome {profileName}</h1>
      <a href={picture}></a>
      <p>{email}</p>
    </div>
  );

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
