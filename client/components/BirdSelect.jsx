import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';
import Search from './Search.jsx'

export default function BirdSelect({ panTo, setSpecies }) {
  const [birdList, setBirdList] = useState([])

  useEffect(() => {
    Axios.get('api/map/mapBirds')
      .then((response) => {
        console.log((response.data.map((i) => i.commonName)));
        setBirdList(response.data.map((i) => i.commonName));
      })
      .catch(err => console.error('AXIOS ERROR', err));
  }, []);

  const handleChange = (e) => {
    // console.log('HANDLECHANGE', e)
    setSpecies(() => [e.target.firstChild.data])
  };

  return (
    <div>
      <br></br>
      <Stack>
        <Autocomplete
          freeSolo
          id="birdSelectDropdown"
          onChange={(e) => handleChange(e)}
          onInputChange={(e) => handleChange(e)}
          disableClearable
          options={birdList.map((i) => i)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Bird Species Spotted"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <Search panTo={ panTo } />
      </Stack>
    </div>
  );
}