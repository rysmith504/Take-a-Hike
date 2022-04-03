import React, { useState, useEffect } from "react";
import axios from "axios";
import PackingList from "./PackingList.jsx";
import UserProfile from "./UserProfile.jsx";

const Quartermaster = () => {
  // assign the state variable to an object with listName and items, and array
  const [packingList, setPackingList] = useState({
    listName: "",
    packingListNames: [],
    packingListDescription: "",
  });

  //captures input list name from the user
  const handleChange = (e) => {
    //set name in state
    setPackingList((state) => {
      //destructure the property name, value,
      //from event.target obj
      const { name, value } = e.target;
      //reset the state obj
      return {
        ...state,
        [name]: value, //the name property set in the jsx
      };
    });
    console.log(packingList);
  };

  const handleSubmit = (event) => {
    //allow react to control the state variables changed on change
    event.preventDefault();

    axios
      //send the user list to the server
      .post("/api/packingLists", {
        listName: packingList.listName,
        packingListDescription: packingList.packingListDescription,
      })
      .then((data) => {
        console.log("Line 47 => this code block was reached", data);
        setPackingList((state) => ({
          ...state,
          packingListNames: [...state.packingListNames, state.listName],
          // listName: "",
          // packingListDescription: "",
        }));
      })
      .catch((err) => {
        console.log("Line 56 => this code block was reached", err);
      });
    alert("Packing list saved successfully!");
  };

  return (
    <>
      <h3 className="profile-card">Quartermaster</h3>
      <div className="profile-card">
        <p>Make and save the lists you'll need for your hiking adventures</p>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          placeholder="Packing list name"
          onChange={handleChange}
          name="listName"
          value={packingList.listName}
        />
        <br></br>
        <br></br>
        <textarea
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="packingListDescription"
          value={packingList.packingListDescription}
        />
        <br></br>
        <br></br>
        <button type="submit">Create and save</button>
      </form>
      <br></br>
      <br></br>
      <div>
        {packingList.packingListNames.map((listName) => {
          return <li>{listName}</li>;
        })}
      </div>
      <div>
        {/* <h4>My packing lists</h4>
        {packingList.packingListNames === undefined ? null : listNames} */}
      </div>
      <PackingList packingListNames={packingList.packingListNames} />
      <UserProfile packingListNames={packingList.packingListNames} />
    </>
  );
};

export default Quartermaster;
