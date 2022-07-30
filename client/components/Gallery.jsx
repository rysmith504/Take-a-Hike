import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";


const Gallery = () => {
  const [fileInputState, setFileInputState] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [gallery, setGallery] = useState([]);

  const handleFileChange = (e) => {
    console.log('photo changed');
    setPhoto(e.target.files[0]);
  }

  const handleFileUpload = async () => {
    if (photo) {
      alert('your photo has been uploaded!')
      const formData = new FormData();
      formData.append(
        'myFile',
        photo,
        photo.name
      )

  
      // console.log(previewSource);
      await axios.post('/api/gallery', {
        data: previewSource
      })
        .then(() => {
        })
        .catch((err) => console.error(err));
        setPhoto(null)
        handleGallery();

    } else {
      alert('no photo selected');
    }

  }

  const fileData = () => {
    console.log('test');

    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
      return (
        <div>
          <h2>Your Image:</h2>
          <p> File Name: {photo.name} </p>
          <p> File Type: {photo.type} </p>
          <p> Last Modified: '{photo.lastModifiedDate.toDateString()}</p>
          <img style={{height: '200px', width: 'auto' }} src={previewSource} alt='chosen'/>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose photo before pressing the upload button</h4>
        </div>
      )
    }
  }

  const handleGallery = () => {
    axios.get('/api/gallery')
      .then((urls) => {
        console.log(urls.data);
        setGallery(urls.data)
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    handleGallery();
  }, [])

  return (
    <div>
      <h1>
        GALLERY PAGE
      </h1>

      <div>
        <input type='file' name='image' value={fileInputState} onChange={handleFileChange} multiple accept='image/*'/>
        <button onClick={handleFileUpload}>
          Upload
        </button>
      </div>
      {photo && fileData()}

      <div id='gallery'>
        {gallery.map((image) => {
          return (
            <img style={{height:'100px', width: 'auto'}} src={image}/>
          )
        })}
      </div>
    </div>
  )
}

export default Gallery