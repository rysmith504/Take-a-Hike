import React, { useEffect } from 'react'
import {
  Marker,
} from '@react-google-maps/api';

const Markers = ({getMarkers, markers, setSelected}) => {

  useEffect(() => {
    getMarkers();
  }, [])

  return (
    markers.map((marker) => (
        <Marker
        key={marker.time}
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

export default Markers;