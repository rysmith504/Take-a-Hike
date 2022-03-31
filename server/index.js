// Import Dependencies
const axios = require("axios");
const { query } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const { PackingLists } = require("./database/models/packingLists");
// PackingLists.sync();
// const { default: PackingList } = require("../client/components/PackingList");
const router = express.Router();
const session = require('express-session')
const passport = require('passport');
require('./middleware/auth.js')
const { cloudinary } = require('./utils/coudinary');

// Set Distribution Path
const PORT = 5555;
const distPath = path.resolve(__dirname, "..", "dist"); //serves the hmtl file of the application as default on load

// Use Middleware
app.use(express.json()); // handles parsing content in the req.body from post/update requests
app.use(express.static(distPath)); // Statically serves up client directory
app.use(express.urlencoded({ extended: true })); // Parses url (allows arrays and objects)
app.use(passport.initialize());
app.use(passport.session());
// Create API Routes

//Auth Routes
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));

app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
}));

app.get('/auth/failure', (req, res) => {
  res.send('did not authenticate');
})

app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('index', (err, html) => {
    res.send(html)
  });
})

app.post("/logout", (req,res) => {
  req.logOut()
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})

//Auth Routes end

// app.get('/!!user')

// router.get('/login', function(req, res, next) { // Login GET ROUTE
//   res.render('login')
// });

////////////////////////////////////////EXTERNAL TRAIL API ROUTE/////////////////////////////////////////

//GET req for trail data by latitude/longitude
app.get("/api/TrailsList", (req, res) => {
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
      // console.log(response.data); - returns array of objects of trail data
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
  // ;
  const secureImageUrls = resources.map((image) => image.secure_url);
  res.json(secureImageUrls);
});

/**
 * Routes for packing list
 */
app.post("/api/packingLists", (req, res) => {
  console.log(req.body, "Server index.js LINE 55");
  PackingLists.create({
    listName: req.body.listName,
    packingListDescription: req.body.packingListDescription,
  })
    .then((data) => {
      console.log("LINE 63", data.dataValues);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err, "Something went wrong");
      res.sendStatus(500);
    });
});

// launches the server from localhost on port 5555
app.listen(PORT, () => {
  console.log(`
  Listening at: http://localhost:${PORT}
  `);
});
