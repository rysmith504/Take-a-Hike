import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { Image } from 'cloudinary-react';
import axios from 'axios';

const preset = 'hikeimages';
const cloudName = 'dbwbxubwi';

const TrailProfile = ({ trailList }) => {
  // console.log(trailList)
  const { id } = useParams();
  const displayTrail = trailList.find((trail) => trail.id == id);
  // console.log(`TRAILPROFILE || LINE 11 || displayTrail`, displayTrail); // access params

  const [image, setImage] = useState('');
  const [trailImageURLs, setTrailImageURLs] = useState();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const { data } = await axios.post(`/api/images/`, {
          trailFolderName: displayTrail.name,
        });
        // console.log('TRAILPROFILE || LOADIMAGES || LINE 24 || data', data);
        setTrailImageURLs(data);
      } catch (error) {
        // console.error('TRAILPROFILE || LOADIMAGES || LINE 27 || error', error);
      }
    };
    if (displayTrail) {
      loadImages();
    }
  }, [id, displayTrail]);

  // temp variable to test tagging functionality with cloudinary upload widget
  // const trailName = 'Trail 2';
  // Can I attach a tag to the uploaded image, and filter photos from get requests using the tags param as an identifier for different trails?

  // console.log(`TRAIL PROFILE || LINE 8 || image `, image);

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  // create upload widget
  let widget;
  if (displayTrail) {
    widget = cloudinary.createUploadWidget(
      // NEED TO ADD FOLDER TO UPLOAD PATH. IF NO FOLDER CREATE ONE?
      {
        cloudName: cloudName,
        uploadPreset: preset,
        maxFiles: 3,
        folder: displayTrail.name, // substitute with trail name passed through props from TrailList Component
        // add userId tag to filter by user
        tags: [displayTrail.name],
      },
      (err, result) => {
        if (!err && result && result.event === 'success') {
          // console.log('TRAILPROFILE || WIDGET || LINE 21 || result', result);
        }
      }
    );
  }
  const showWidget = (event, widget) => {
    event.preventDefault();
    widget.open();
  };
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  // create get request to backend to get all images from cloudinary

  // const loadImages = async () => {
  //   try {
  //     const res = await fetch(`/api/images/`);
  //     const data = await res.json();
  //     console.log('TRAILPROFILE || LOADIMAGES || LINE 48 || data', data);
  //     setTrailImageURLs(data);
  //   } catch (error) {
  //     console.error('TRAILPROFILE || LOADIMAGES || LINE 51 || error', error);
  //   }
  // };

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  return (
    <section  class="section is-medium">
    <figure className="profile-card">
      <img src={`${displayTrail.thumbnail}`} />
      <figcaption>
      <h1>{displayTrail.name}</h1>
        <div>
          <h2>{displayTrail.city}</h2>
          <h3>{displayTrail.region}</h3>
          <p>{displayTrail.description}</p>
          <p>Directions: {displayTrail.directions}</p>
          <ul>
            <li>Difficulty Level: {displayTrail.difficulty}</li>
            <li>Features: {displayTrail.features}</li>
            <li>Rating: {displayTrail.rating}</li>
            <li>Length (miles): {displayTrail.length}</li>
            <li>Latitude: {displayTrail.lat}</li>
            <li>Longitude: {displayTrail.lon}</li>
            <a href={`${displayTrail.url}`} target="_blank">Trail Website</a>
          </ul>
        </div>
      {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
      <button className="icons"
        onClick={(e) => {
          showWidget(e, widget);
        }}
      >
        UPLOAD PHOTOS
      </button>

      </figcaption>
      <div className="profile-card">
        {trailImageURLs ? (
          // <div> div to house images for css styling
          trailImageURLs.map((trailImageURL, index) => (
            <Image
              key={index}
              cloudName={cloudName}
              publicId={trailImageURL}
              width="300"
              crop="scale"
            />
          )) // </div>
        ) : (
          <p src="https://i.gifer.com/ZZ5H.gif">Getting images</p>
        )}
      </div>
    </figure>
    </section>
  );
};

export default TrailProfile;
