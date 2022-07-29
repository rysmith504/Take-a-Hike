import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useId } from "@reach/auto-id";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import '@reach/combobox/styles.css';
import mapStyles from '../styles/mapStyles.js'
import PersonPinIcon from '@material-ui/icons/PersonPin';

import BirdSelect from './BirdSelect.jsx'

// import Search from './Search.jsx'

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '70vh'
}

const center = {
  lat: 30.0038,
  lng: -90.0972
}

const options = {
  styles: mapStyles
}

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      //axios post
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ])
    console.log(event)
    console.log(markers);
  }, [])

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

    <div>
      <BirdSelect />
      <Search panTo={ panTo } />
      <input placeholder='enter species here'></input>
      <Locate panTo={ panTo } />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map(marker => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'https://i.imgur.com/6Xmrxiq.png',
              scaledSize: new window.google.maps.Size(45,45),
            }}
            onClick ={() => {
              setSelected(marker)
            }}
          />
        ))}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
            setSelected(null);
          }}>
            <div>
              <h2>Bird Spotted</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )

}

function Locate({ panTo }) {
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

function Search({ panTo }){
  let {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutoComplete({
    requestOptions: {
      location: {
        lat: () => 30.0038,
        lng: () => -90.0972
      },
      radius: 200 * 1000,
    },
  });

  return (
    <div className='search'>
      <Combobox
      // when a user selects a suggestion, call set value to update state and place whatever they chose in there without going to google to fetch the data
      // , we will clear out all the other suggestions on selection,
      // take address and call getgeocode to get latlng, and pan map to the latlng of selection
        onSelect={async (address) => {
          setValue=(address);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          // disabled={!ready}
          placeholder='Enter a location'
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === 'OK' &&
            data.map(({id, description}) => (
              <ComboboxOption key={id} value={description} />
          ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

