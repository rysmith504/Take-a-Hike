// Import Dependencies
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import './styles/main.css';
import TrailsList from './TrailsList.jsx';
import Quartermaster from './Quartermaster.jsx';
import TrailProfile from './TrailProfile.jsx';
import UserProfile from './UserProfile.jsx';
import BirdingCheckList from './BirdingCheckList.jsx';
import Map from './Map.jsx'
import PackingList from './PackingList.jsx';
import Login from './Login.jsx';
import Weather from './Weather.jsx';
import TripsList from './TripsList.jsx';
import Form from './Form.jsx';

const App = () => {
  const [trailList, setTrailList] = useState([]);

  const [navOpen, setNavOpen] = useState(false)

  const handleMenu = () => {
    if(!navOpen){
      document.getElementById('navMenu').classList.add('is-active');
    } else {
      document.getElementById('navMenu').classList.remove('is-active');
    }
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    if (localStorage.getItem('TrailList')) {
      const trails = JSON.parse(localStorage.getItem('TrailList'));
      setTrailList(trails);
    }
    if (localStorage.getItem('TripsList')) {
      const trips = JSON.parse(localStorage.getItem('TripsList'));
      setTripsList(trips);
    }
  }, []);

  // were in trail list
  const handleGetTrails = (location) => {
    axios
      .get('/api/trailslist', {
        params: { lat: location.lat, lon: location.lon },
      })
      .then((response) => {
        setTrailList(response.data.data);
        // add data to local storage
        localStorage.setItem('TrailList', JSON.stringify(response.data.data));
      })
      .catch((err) => {
        console.error('ERROR: ', err);
      });
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <img
          className='app__logo'
          src='https://res.cloudinary.com/dbwbxubwi/image/upload/v1649015216/Parc%20des%20Familles%20Trail%20by%20NOMAMBO/qoej8fkfe2og2gkdkpmn.png'
        />
        <h1 className='Header app__header' alignment='center'>
          Trail Feathers
        </h1>
      </div>
      <nav class="navbar" role="navigation" aria-label="main navigation">

<a role="button"
  class="navbar-burger"
  aria-label="menu"
  aria-expanded="true"
  data-target="navMenu"
  onClick={handleMenu}
>
  <span aria-hidden="true">
  </span>
  <span aria-hidden="true">
  </span>
  <span aria-hidden="true">
  </span>
</a>

<div id="navMenu" class="navbar-menu">
  <div class="navbar-start">
  <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link" onClick={handleMenu}>
        <Link to='/trips'>Trips</Link>
      </a>

      <div class="navbar-dropdown">
        <a class="navbar-item" onClick={handleMenu}>
          <Link to='/quartermaster'>Quartermaster</Link>
        </a>
        <a class="navbar-item" onClick={handleMenu}>
          <Link to='/birdingchecklist'>Birding Checklist</Link>
        </a>
        <a class="navbar-item" onClick={handleMenu}>
          <Link to='/form'>Add a Trip</Link>
        </a>
      </div>
    </div>
    <a class="navbar-item" onClick={handleMenu}>
      <Link to='/trailslist'>Trails List</Link>
    </a>
    <a class="navbar-item" onClick={handleMenu}>
      <Link to='/weather'>Weather</Link>
    </a>
    <a class="navbar-item" onClick={handleMenu}>
      <Link to='/map'>Map</Link>
    </a>

    <a class="navbar-item" onClick={handleMenu}>
      <Link to='/profile'>User Profile</Link>
    </a>
  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a class="button is-light" onClick={handleMenu}>
          <Link to='/login'>Login</Link>
        </a>
      </div>
    </div>
  </div>
</div>
</nav><Routes>
  <Route
    path='trailslist'
    element={<TrailsList
      handleGetTrails={handleGetTrails}
      trailList={trailList} />} />
  <Route path='login' element={<Login />} />
  <Route path='weather' element={<Weather />} />
  <Route path='trips'
    element={<TripsList />} />
  <Route
    path='trailprofile/:id'
    element={<TrailProfile trailList={trailList} />} />
  <Route path='quartermaster' element={<Quartermaster />} />
  {/* <Route path="packinglist/:id" element={<PackingList />} /> */}
  <Route path='birdingchecklist' element={<BirdingCheckList />} />
  <Route path='map' element={<Map />} />
  <Route path='profile' element={<UserProfile />} />
  <Route path='form' element={<Form />} />
</Routes><Outlet />
    </div>
  );
};

// Export Component
export default App;
