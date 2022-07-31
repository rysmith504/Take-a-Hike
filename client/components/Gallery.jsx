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
  Select, 
} from "@mui/material";

const Gallery = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [gallery, setGallery] = useState([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('choose a category');

  const theme = createTheme({
    typography: {
      h3: {
        fontFamily: 'Roboto',
      },
      t: {
        fontFamily: 'Roboto'
      },
      h5: {
        fontFamily: 'Roboto',
        fontColor: 'white'
      }
    },
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#209CEE',
        darker: '#5e35b1',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  const handleFileChange = (e) => {
    // console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (photo && location && category !=='choose a category') {
      alert("your photo has been uploaded!");
      const formData = new FormData();
      formData.append("myFile", photo, photo.name);

      // console.log(previewSource);
      await axios
        .post("/api/gallery", {
          data: previewSource,
          location,
          category,
        })
        .then(() => {})
        .catch((err) => console.error(err));
      setPhoto(null);
      handleGallery();
      setLocation('');
      setCategory('choose a category');
    } else {
      if (!photo) {
        alert("please select a photo to upload")
      }
      else if (!location || category === 'choose a category') {
        alert ("please fill out the required info");
      }
    }

  };

  const handleLocation = (e) => {
    // console.log(e.target.value);
    setLocation(e.target.value);
  }

  const handleCategory = (e) => {
    // console.log(e.target.value);
    setCategory(e.target.value);
  }

  const fileData = () => {
    // console.log("test");

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
            style={{ height: "200px", width: "auto"}}
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
        // console.log(urls.data);
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
      <ThemeProvider theme={theme}>

      <Grid container>
        <Grid item align="center" xs={12}>
          <Typography variant='h3'>
            <h3>GALLERY PAGE</h3>
          </Typography>

          <div style={{marginBottom: '15px'}}>

          <OutlinedInput multiple accept="image/*" type='file' name='image' onChange={handleFileChange} value={fileInputState}/>
            {/* <input
              type="file"
              name="image"
              value={fileInputState}
              onChange={handleFileChange}
              multiple
              accept="image/*"
            /> */}

            <Fab color='primary' variant='extended' size='small' onClick={handleFileUpload}>
              Upload
            </Fab>
            <div>
              <OutlinedInput onChange={(e) => handleLocation(e)} value={location} type='text' placeholder='where was this taken?'/>
              <Select native onChange={(e) => handleCategory(e)}>
                <option>choose a category</option>
                <option>scenery</option>
                <option>wildlife</option>
              </Select>

            </div>

          </div>

          {photo && fileData()}

        </Grid>
      </Grid>
      <div align='center' id="gallery">
        <ImageList variant='quilted' align='center' sx={{ borderRadius: '25px', padding: '10px', backgroundColor: 'lavenderblush', width: 600, height: 450, boxShadow: 3}} cols={3} rowHeight={220}>
          {gallery.map((image, i) => (
            <ImageListItem sx={{boxShadow: 3, borderRadius: '25px', backgroundColor: 'white'}} key={i} onClick={() => handleClick(image.url)}>
              <a href={image.url} target="_blank">
                <img
                  style={{height: '220px', width: 'auto', borderRadius: '25px 25px 25px 25px'}}
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
      </ThemeProvider>
    </div>
  );
};

export default Gallery;
