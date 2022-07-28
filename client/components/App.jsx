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
// import Login from './Login.jsx';
import Weather from './Weather.jsx';
import TripsList from './TripsList.jsx';

const App = () => {
  const [trailList, setTrailList] = useState([]);

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
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        {/* <Link to='/login'>Login</Link> |{' '} */}
        <Link to='/weather'>Weather</Link> | {' '}
        <Link to='/trips'>Trips</Link> | {' '}
        <Link to='/trailslist'>Trails List</Link> |{' '}
        {/* <Link to="/trailprofile/1">Trail Profile</Link> |{' '} */}
        <Link to='/quartermaster'>Quartermaster</Link> |{' '}
        {/* <Link to="/packinglist">Packing List</Link> |{" "} */}
        <Link to='/birdingchecklist'>Birding Checklist</Link> |{' '}
        <Link to='/map'>Map</Link> |{' '}
        <Link to='/profile'>User Profile</Link> |{' '}

      </nav>
      {/* <Route path="login" element={<Login />} /> */}
      <Routes>
        <Route
          path='trailslist'
          element={
            <TrailsList
              handleGetTrails={handleGetTrails}
              trailList={trailList}
            />
          }
        />
        {/* <Route path='login' element={<Login />} /> */}
        <Route path='weather' element={<Weather />}/>
        <Route path='trips' 
        element={ <TripsList/> }/>
        <Route
          path='trailprofile/:id'
          element={<TrailProfile trailList={trailList} />}
        />
        <Route path='quartermaster' element={<Quartermaster />} />
        {/* <Route path="packinglist/:id" element={<PackingList />} /> */}
        <Route path='birdingchecklist' element={<BirdingCheckList />} />
        <Route path='map' element={<Map />} />
        <Route path='profile' element={<UserProfile />} />
      </Routes>
      <Outlet />
    </div>
  );
};

// Export Component
export default App;
