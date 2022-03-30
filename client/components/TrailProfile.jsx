import React, { useState } from 'react';

const preset = 'hikeimages';
const cloudName = 'dbwbxubwi';

const TrailProfile = () => {
  const [image, setImage] = useState('');
  console.log(`TRAIL PROFILE || LINE 8 || image `, image);

  // create upload widget
  const widget = window.cloudinary.createUploadWidget(
    { cloudName: cloudName, uploadPreset: preset, maxFiles: 3 },
    (err, result) => {
      if (!err && result && result.event === 'success') {
        console.log(result);
      }
    }
  );

  const showWidget = (event, widget) => {
    event.preventDefault();
    widget.open();
  };

  return (
    <div>
      <h1>Trail Profile</h1>
      {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
      <button
        onClick={(e) => {
          showWidget(e, widget);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default TrailProfile;
