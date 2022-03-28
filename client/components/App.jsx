import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import Login from "./Login.jsx"

const App = () => {
  return (
    <>
    <Login/>
      <h1 className="Header" alignment="center">
        Take a Hike in Louisiana
      </h1>
      <h2>All parks within 500 miles radius</h2>
    </>
  );
};

export default App;
