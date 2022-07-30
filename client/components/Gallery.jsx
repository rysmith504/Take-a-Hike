import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  OutlinedInput,
  ThemeProvider,
  createTheme,
  Fab,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";

const Gallery = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [gallery, setGallery] = useState([]);

  const handleFileChange = (e) => {
    console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (photo) {
      alert("your photo has been uploaded!");
      const formData = new FormData();
      formData.append("myFile", photo, photo.name);

      // console.log(previewSource);
      await axios
        .post("/api/gallery", {
          data: previewSource,
        })
        .then(() => {})
        .catch((err) => console.error(err));
      setPhoto(null);
      handleGallery();
    } else {
      alert("no photo selected");
    }
  };

  const fileData = () => {
    console.log("test");

    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      return (
        <div>
          <h2>Your Image:</h2>
          <p> File Name: {photo.name} </p>
          <p> File Type: {photo.type} </p>
          <p> Last Modified: '{photo.lastModifiedDate.toDateString()}</p>
          <img
            style={{ height: "200px", width: "auto" }}
            src={previewSource}
            alt="chosen"
          />
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose photo before pressing the upload button</h4>
        </div>
      );
    }
  };

  const handleGallery = () => {
    axios
      .get("/api/gallery")
      .then((urls) => {
        console.log(urls.data);
        setGallery(urls.data);
      })
      .catch((err) => console.error(err));
  };

  const handleClick = (e) => {
    console.log ('clicked');
    console.log(e);
  }

  useEffect(() => {
    handleGallery();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item align="center" xs={12}>
          <h1>GALLERY PAGE</h1>

          <div>
            <input
              type="file"
              name="image"
              value={fileInputState}
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
          {photo && fileData()}
        </Grid>
      </Grid>
      <div align='center' id="gallery">
        <ImageList variant='quilted' align='center' sx={{ padding: '10px', backgroundColor: '#272727', width: 600, height: 450, boxShadow: 3}} cols={3} rowHeight={220}>
          {gallery.reverse().map((image, i) => (
            <ImageListItem sx={{boxShadow: 3, borderRadius: '25px', backgroundColor: 'white'}} key={i} onClick={() => handleClick(image.url)}>
              <a href={image.url} target="_blank">
                <img
                  style={{height: '220px', width: 'auto', borderRadius: '25px'}}
                  src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  // alt={item.title}
                  // loading="lazy"
                />

              </a>
            </ImageListItem>
          ))}
        </ImageList>

        {/* <Grid rowSpacing={3} columns={12} container>

          {gallery.map((image) => {
            return (
              <Grid item xs={3}>
                <Paper>
                  <span>
                    <img style={{height: '100px', width: '100px'}} src={image.url}/>
                  </span>
                  <span>
                    <div>
                    location: 21 jump street
                    </div>
                    <div>
                      taken by: "VINCENT"
                    </div>
                    <div>
                      category: "BIRDS"
                    </div>
                  </span>
                </Paper>
              </Grid>
            )
          })}

        </Grid> */}
      </div>
    </div>
  );
};

export default Gallery;
