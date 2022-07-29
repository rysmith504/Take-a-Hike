import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';

export default function BirdSelect() {
  const [birdList, setBirdList] = useState([])

  useEffect(() => {
    Axios.get('api/map/mapBirds')
      .then((response) => {
        console.log(response);
        setBirdList(response.data);
      })
      .catch(err => console.error('AXIOS ERROR', err));
  }, []);

  return (
    <div>
      <Autocomplete
        freeSolo
        id="birdSelectDropdown"
        disableClearable
        options={birdList.map((index) => index.commonName)}
        renderInput={(params) => (
          <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          />
          )}
          />
    </div>
  );
}