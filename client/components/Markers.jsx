import React from 'react'
import {
  Marker,
} from '@react-google-maps/api';

export default function Markers ({markers, setSelected})  {

  return (
    markers.map((marker) => (
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
    ))
  );
}