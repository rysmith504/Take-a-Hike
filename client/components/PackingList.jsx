import React, { useEffect, useState } from "react";
import axios from "axios";

const PackingListItems = ({
  listName,
  //packingListNames,
  packingListDescription,
}) => {
  //create state variable
  const [packingListItems, setPackingListItems] = useState({
    listItem: "",
    listItems: [],
  });
  //captures input list name from the user
  const handleChange = (e) => {
    //set name in state
    setPackingListItems((state) => {
      //reset the state obj
      return {
        ...state,
        listItem: e.target.value, //the name property set in the jsx
      };
    });
  };

  const handleSubmit = (event) => {
    //allow react to control the state variables changed on change
    event.preventDefault();
    console.log(packingListItems.listItem, "FROM LINE 29");
    axios
      //send the user list to the server
      .post("/api/packingListItems", {
        listItem: packingListItems.listItem,
      })
      .then((data) => {
        setPackingListItems((state) => ({
          ...state,
          listItems: [...state.listItems, state.listItem],
          // listItem: "",
        }));
      });
  };
  //distructure all state variables for usage
  const { listItem, listItems } = packingListItems;
  return (
    <div>
      {/* { //display the listname} */}
      {/* <h3>{packingListItems.listName}</h3> */}
      {/* { //display the list description} */}
      {/* <p>{packingListItems.listDescription}</p> */}
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          placeholder="List item"
          onChange={handleChange}
          // onKeyPress={handleKeypress}
          //name="listItem"
          value={listItem}
        />
        <button onClick={handleSubmit}> save</button>
      </form>
      <br></br>
      <br></br>
      <div>
        <h2>{listName}</h2>
        <p>{packingListDescription}</p>
        <ul>
          {listItems.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PackingListItems;

//saves item to the database on enter key press
// const handleKeypress = (e) => {
//   //it triggers by pressing the enter key
//   if (e.keyCode === 13) {
//     () => handleSubmit();
//   }
// };
