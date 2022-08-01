import React from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const Search = ({ panTo }) => {
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
    <div>
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
          disabled={!ready}
          placeholder='View feathers worldwide!'
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

export default Search;