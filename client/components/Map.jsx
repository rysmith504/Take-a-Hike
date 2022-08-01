import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import '@reach/combobox/styles.css';
import mapStyles from '../styles/mapStyles.js'

import BirdSelect from './BirdSelect.jsx'
import Markers from './Markers.jsx'
import axios from 'axios';

const libraries = ['places'];

const mapContainerStyle = {
  width: 'auto',
  height: '70vh'
}

const center = {
  lat: 30.0038,
  lng: -90.0972
}

const options = {
  styles: mapStyles
}

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [species, setSpecies] = useState(null);

  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) postMarkers();
      else didMount.current = true;
  }, [markers.length]);

  const getMarkers = () => {
    axios.get('/api/map/markers')
      .then(response => {
        console.log(response)
        const markerArr = response.data.map((i) => {
          return(
            {
              _id: i._id,
              species: i.commonName,
              time: i.time,
              lat: parseFloat(i.lat),
              lng: parseFloat(i.lng)
            }
          );
        })
        setMarkers(markerArr);
      })
      .catch(err => console.error('AXIOS MARKER GET ERROR', err))
  }

  const postMarkers = () => {
    axios.post('/api/map/markers', {
      commonName: markers[markers.length - 1].species,
      time: new Date(markers[markers.length - 1].time).toISOString(),
      lat: markers[markers.length - 1].lat,
      lng: markers[markers.length - 1].lng,
    })
      .catch(err => console.error(err));
  }

  const speciesRef = useRef(species);

  const onMapClick = useCallback((event) => {
    speciesRef.current = document.getElementById('birdSelectDropdown').value;
    if (speciesRef.current.length) {
    setMarkers((current) => [
      //axios post
      ...current,
      {
        species: speciesRef.current,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ])
    console.log(document.getElementById('birdSelectDropdown'))
    document.getElementById('birdSelectDropdown').value = null;
    }  else {
      return alert('please select species');
    }
  }, []);



  const selectedRef = useRef(selected)
  const mapRef = useRef();

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, [])

  if(loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (

    <div >
      <BirdSelect
        panTo={ panTo }
        setSpecies={setSpecies}
        />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Locate panTo={ panTo } />
        <Markers
          markers={markers}
          getMarkers={getMarkers}
          setSelected={setSelected}
        />
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
            setSelected(null);
          }}>
            <div>
              <h2>{selected.species}</h2>
              <p>Spotted {formatRelative(new Date(selected.time), new Date())}
                <br/>
                location: lat: { selected.lat }, lng: { selected.lng }
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )

}

const Locate = ({ panTo }) => {
  return (
  <button className='locate' onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, () => null);
  }}>
    <img src='https://i.imgur.com/zjTteEV.png' alt="compass - locate me"/>
  </button>
  );
}

export default Map;
