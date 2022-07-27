import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import '@reach/combobox/styles.css';
import mapStyles from '../styles/mapStyles.js'

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
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

  const [markers, setMarkers] = React.useState([]);

  if(loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (

    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers((current) => [
            ...current, 
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            },
          ])
        }}
      >
        {markers.map(marker => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: 'https://i.imgur.com/6Xmrxiq.png',
            scaledSize: new window.google.maps.Size(45,45),
          }}
        />
        ))}
      </GoogleMap>
    </div>
  )
}