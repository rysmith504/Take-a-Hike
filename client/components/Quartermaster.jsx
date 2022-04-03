import React, { useState, useEffect } from "react";
import axios from "axios";
import PackingList from "./PackingList.jsx";
//mport UserProfile from "./UserProfile.jsx";

const Quartermaster = () => {
  // assign the state variable to an object with listName and items, and array
  const [packingList, setPackingList] = useState({
    listName: "",
    packingListNames: [],
    packingListDescription: "",
    //listItem: "",
  });

  useEffect(() => {
    console.log("LINE 78 data");
    axios
      .get("/api/packingLists")
      .then((response) => {
        console.log("ALL LISTS FROM DATABASE LINE 79 ||", response.data);
        setPackingList((state) => {
          return {
            ...state,
            listName: "",
            listItem: "",
            packingListDescription: "",
            packingListNames: response.data,
          };
        });
      })
      .catch((err) => {
        console.error("LINE 68 ERROR ON THE SERVER SIDE", err);
      });
  }, []);

  //captures input list name from the user
  const handleChange = (e) => {
    //set name in state
    setPackingList((state) => {
      const { name, value } = e.target;
      //reset the state obj
      return {
        ...state,
        [name]: value, //the name property set in the jsx
      };
    });
    console.log(packingList);
  };

  //Data packing lists are being feched by can't state e not resetting.
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
        console.log("Line 61 => this code block was reached", data);
      })
      .catch((err) => {
        console.log("Line 64 => this code block was reached", err);
      });
    alert("Packing list saved successfully!");
  };

  const { packingListDescription, listName, packingListNames } = packingList;

  return (
    <>
      <h3 className="header">Quartermaster</h3>
      <div className="quart-description">
        <p>Make and save the lists you'll need for your hiking adventures</p>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          placeholder="Packing list name"
          onChange={handleChange}
          name="listName"
          value={listName}
        />
        <br></br>
        <br></br>
        <textarea
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="packingListDescription"
          value={packingListDescription}
        />
        <br></br>
        <br></br>
        <>List Items bellow:</>
        <br></br>
        {/* <textarea
          type="text"
          placeholder="listItem"
          onChange={handleChange}
          name="listItem"
          value={listItem}
        /> */}
        <br></br>
        <br></br>
        <button type="submit">Create and save</button>
      </form>
      <br></br>
      <br></br>
      <div>
        <h3>My packing Lists</h3>
        {packingListNames.map((listName) => {
          //console.log("LINE 124", listName);
          //console.log(packingList.packingListNames);
          return <div key={listName._id}>{listName.listName}</div>;
        })}
      </div>
      <div></div>
      {/* <PackingList
        packingListNames={packingListDescription}
        packingListDescription={packingListDescription}
        listName={listName}
      /> */}
      {/* <UserProfile packingListNames={packingListNames} /> */}
    </>
  );
};

export default Quartermaster;

// const getAllPackingLists = () => {
//   axios
//     .get("/api/packingLists")
//     .then((response) => {
//       //console.log("ALL LISTS FROM DATABASE LINE 59 ||", response.data);
//       setPackingList((state) => {
//         return {
//           ...state,
//           listName: "",
//           listItem: "",
//           packingListDescription: "",
//           packingListNames: response.data,
//         };
//       });

//     })
//     .catch((err) => {
//       console.error("LINE 68 ERROR ON THE SERVER SIDE", err);
//     });
// };
