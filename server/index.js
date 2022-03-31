// Import Dependencies
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const axios = require("axios");
const { cloudinary } = require("./utils/coudinary");

// Set Distribution Path
const PORT = 5555;
const distPath = path.resolve(__dirname, "..", "dist"); //serves the hmtl file of the application as default on load

// Use Middleware
app.use(express.json()); // handles parsing content in the req.body from post/update requests
app.use(express.static(distPath)); // Statically serves up client directory
app.use(express.urlencoded({ extended: true })); // Parses url (allows arrays and objects)

// Create API Routes

// app.get('/', (req, res) => { // Main Page GET ROUTE
//   res.send('<a href="/auth/google">Authenticate with google</a>')
// });

// app.get('/!!user')

// router.get('/login', function(req, res, next) { // Login GET ROUTE
//   res.render('login')
// });

//GET req all LA trail data from external API
app.get("/api/TrailsList", (req, res) => {
  // res.send();
  // console.log('Line 31 = ', req.query);
  axios
    .get(
      `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${req.query.lat}&lon=${req.query.lon}&radius=100`,
      {
        headers: {
          'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
          'X-RapidAPI-Key': 'a27adeb778msh22d13ed248d5359p1d95b8jsnb7239b396c5c'
        }
      }
    )
    .then((response) => {
      console.log("Line 34 = ", response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.error("ERROR: ", err);
      res.sendStatus(404);
    });
});

//////////////////////////////////////// Cloudinary routes //////////////////////////////////////

// get request to get all images (this will later be trail specific)
app.get("/api/images", async (req, res) => {
  // NEED TO CHANGE ENDPOINT TO INCLUDE TRAIL SPECIFIC PARAM SO PHOTOS CAN BE UPLOADED + RENDERED PROPERLY

  // Can create new folder with upload from TrailProfile component. Need to modify get request to filter based on folder param (which will be equal to the trail name)
  const { resources } = await cloudinary.search
    .expression('resource_type:image AND folder:"Trail 2"/*')
    .sort_by("created_at", "asc")
    .max_results(30)
    .execute();
  // console.log(
  //   'SERVER INDEX.JS || CLOUDINARY GET || LINE 38 || resources ==>',
  //   resources
  // );
  const secureImageUrls = resources.map((image) => image.secure_url);
  res.json(secureImageUrls);
});

// // get request to get all images (this will later be trail specific)
// app.get(`/api/images/}`, async (req, res) => {
//   // NEED TO CHANGE ENDPOINT TO INCLUDE TRAIL SPECIFIC PARAM SO PHOTOS CAN BE UPLOADED + RENDERED PROPERLY

//   // Can create new folder with upload from TrailProfile component. Need to modify get request to filter based on folder param (which will be equal to the trail name)
//   const { resources } = await cloudinary.search
//     .expression(`resource_type:image`)
//     .sort_by('created_at', 'asc')
//     .max_results(30)
//     .execute();
//   // console.log(
//   //   'SERVER INDEX.JS || CLOUDINARY GET || LINE 38 || resources ==>',
//   //   resources
//   // );
//   const secureImageUrls = resources
//     // .filter((image) => (image.folder = 'trailName'))
//     .map((image) => image.secure_url);
//   res.json(secureImageUrls);
// });

// launches the server from localhost on port 5555
app.listen(PORT, () => {
  console.log(`
  Listening at: http://localhost:${PORT}
  `);
});
