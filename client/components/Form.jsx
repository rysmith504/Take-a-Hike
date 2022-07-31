import React, { useState, useEffect } from 'react';
import axios from "axios";

const Form = () => {
  const [userId, setUserId] = useState('');
  const [tripDetails, setTripDetails] = useState(
    {
      tripName: '',
      tripDescription: '',
      tripLocation: '',
      tripAddress: '',
      tripDate: '',
      user_id: userId
    }
  )

  useEffect(() => {
    axios
      .get("/profile")
      .then((profile) => {
        const user = profile.data;
        setUserId(user._id);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });
  }, [])

  // captures input from the form
  const handleTripName = (e) => {
    const {value } = e.target;
    console.log(value);
    setTripDetails((state) => {
      return { ...state, tripName: value };
    });
  };

  const handleTripLocation = (e) => {
    const { value } = e.target;
    console.log(value);
    setTripDetails((state) => {
      return { ...state, tripLocation: value };
    });
  };

  const handleTripAddress = (e) => {
    const { value } = e.target;
    console.log(value);
    setTripDetails((state) => {
      return { ...state, tripAddress: value };
    });
  };

  const handleTripDate = (e) => {
    const { value } = e.target;
    console.log(value);
    setTripDetails((state) => {
      return { ...state, tripDate: value };
    });
  };

  const handleTripDescription = (e) => {
    const { value } = e.target;
    console.log(value);
    setTripDetails((state) => {
      return { ...state, tripDescription: value };
    });
  };

  // submit form data to Trips table in database
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      tripName,
      tripDescription,
      tripLocation,
      tripAddress,
      tripDate,
      user_id: userId
    } = tripDetails;

    axios.post('/api/trips', {
      tripName,
      tripDescription,
      tripLocation,
      tripAddress,
      tripDate,
      user_id: userId
    })
    .then((response) => {
      console.log('got trips');
    })
    .catch((err) => {
      console.error('ERROR: ', err);
    });
    setTripDetails((state) => {
      return {
        ...state,
        tripName: '',
        tripDescription: '',
        tripLocation: '',
        tripAddress: '',
        tripDate: '',
        user_id: userId
      }
    });
  };

  return (
    <div className='profile-card'>
            <br></br>
      <h3
        className="content has-text-centered"
        padding="20px 40px"
        margin-left="40px"
      >
        Add Your Trip
      </h3>
      <br></br>
      <div class="field">
        <label class="label">Trip Name</label>
        <div class="control">
          <input onChange={handleTripName} class="input" type="text"  value={tripDetails.tripName} />
        </div>
      </div>

      <div class="field">
        <label class="label">City, State</label>
        <div class="control">
          <input id="autocomplete" onChange={handleTripLocation} class="input" type="text" value={tripDetails.tripLocation} />
        </div>
      </div>

      <div class="field">
        <label class="label">Trip Address</label>
        <div class="control">
          <input onChange={handleTripAddress} class="input" type="text" value={tripDetails.tripAddress} />
        </div>
      </div>

      <div class="field">
        <label class="label">Trip Date</label>
        <div class="control">
        <input onChange={handleTripDate} type="date" id="date" name="date" value={tripDetails.tripDate}></input>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Trip Description</label>
        <div class="control">
          <textarea onChange={handleTripDescription} class="textarea" value={tripDetails.tripDescription}></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button onClick={handleSubmit} class="button is-link">Submit</button>
        </div>
      </div>

    </div>
  );
};

export default Form;
