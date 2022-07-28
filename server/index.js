// Import Dependencies
const axios = require('axios');
const {sequelize, Op} = require('sequelize');
const { query } = require('express');
const express = require('express');
const path = require('path');
const passport = require('passport');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const { Trips } = require("./database/models/trips.js")
const { BirdList } = require("./database/models/birdList.js")
const { BirdSightings } = require("./database/models/birdSightings.js")
const { PackingLists } = require("./database/models/packingLists");
const { PackingListItems } = require("./database/models/packingListItems");

// const { default: PackingList } = require("../client/components/PackingList");
const router = express.Router();
const session = require('express-session');
require('./middleware/auth.js');
const { cloudinary } = require('./utils/coudinary');
const { Users } = require('./database/models/users');

// // Import DB
// const { db } = require('./database/index.js')

// // Import Routes
// const birdListRouter = require('./database/routes/birdListRouter.js')

// Set Distribution Path
const PORT = 3000;
const distPath = path.resolve(__dirname, "..", "dist"); //serves the hmtl file of the application as default on load

// Create backend API
const app = express();

// Use Middleware
app.use(express.json()); // handles parsing content in the req.body from post/update requests
app.use(express.static(distPath)); // Statically serves up client directory
app.use(express.urlencoded({ extended: true })); // Parses url (allows arrays and objects)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
// Create API Routes
app.use(passport.session());

const successLoginUrl = 'http://localhost:3000/#/trailslist';
const errorLoginUrl = 'http://localhost:3000/login/error';

//Auth Routes
app.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'cannot login to Google',
    failureRedirect: errorLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    res.redirect('/');
    res.send('thank you for signing in!');
  }
);

app.get("/profile",(req, res) => {
  Users.findOne()
    .then((data) => {
      console.log('data', data);
      res.send(data).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

////////////////////////////////////////EXTERNAL TRAIL API ROUTE/////////////////////////////////////////

//GET req for trail data by latitude/longitude
app.get("/api/trailslist", (req, res) => {
  axios
    .get(
      `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${req.query.lat}&lon=${req.query.lon}&radius=100`,
      {
        headers: {
          "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
          "X-RapidAPI-Key":
            "a27adeb778msh22d13ed248d5359p1d95b8jsnb7239b396c5c",
        },
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
app.post("/api/images", async (req, res) => {
  console.log(`server index.js || LINE 70`, req.body);
  // NEED TO CHANGE ENDPOINT TO INCLUDE TRAIL SPECIFIC PARAM SO PHOTOS CAN BE UPLOADED + RENDERED PROPERLY

  // Can create new folder with upload from TrailProfile component. Need to modify get request to filter based on folder param (which will be equal to the trail name)
  const resources = await cloudinary.search
    .expression(`resource_type:image AND folder:${req.body.trailFolderName}/*`)
    .sort_by('created_at', 'desc')
    .max_results(30)
    .execute();
  // console.log(
  //   'SERVER INDEX.JS || CLOUDINARY GET || LINE 38 || resources ==>',
  //   resources
  // ;
  // try to filter before map
  const secureImageUrls = resources.resources
    .filter((imageObj) => imageObj.folder === req.body.trailFolderName)
    .map((image) => image.secure_url);
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
/**
 * Routes for packing list GET ALL LISTS
 */
app.get("/api/packingLists", (req, res) => {
  console.log("Server index.js LINE 166", req.body);
  PackingLists.findAll()
    .then((data) => {
      console.log("LINE 169", data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err, "Something went wrong");
      res.sendStatus(404);
    });
});

/**
 * post request to the packingListItems
 */
app.post('/api/packingListItems', (req, res) => {
  console.log(
    'Is this being reached? LINE 103 SERVER.index.js || REQ.BODY \n',
    req.body
  );
  PackingListItems.create(listItem)
    .then((data) => {
      console.log('from lINE 106 INDEX.js || DATA \n', data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Failed to create FROM 113', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////Bird Sightings

//////////////////////////////////////////////////////////////Bird List Routes


//GET req for all birdList data
app.get("/api/birdList/", (req, res) => {
  BirdList.findAll()
    .then((birds) => {
      res.json(birds);
    })
    .catch((err) => {
      console.error("ERROR: ", err);
      res.sendStatus(404);
    });
});

//GET req for all select birdList data
app.get('/api/birdList/birdSearch', (req, res) => {
  BirdList.findAll({
    where: {
      scientificName: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('scientificName')),
        'LIKE',
        '%' + req.query.search.toLowerCase() + '%'
      ),
    },
  })
    .then((birds) => {
      res.json(birds);
    })
    .catch((err) => {
      console.error("ERROR: ", err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////Bird Sightings Routes 

//GET req for all birdSightings data
app.get('/api/birdsightings', (req, res) => {
  BirdSightings.findAll()
    .then((birdSightings) => {
      res.json(birdSightings);
    })
    .catch((err) => {
      console.error('ERROR: ', err);
      res.sendStatus(404);
    });
});

//POST req to birdSightings database
app.post('/api/birdsightings', (req, res) => {
  // console.log('Line 231 - Back End Bird Sightings Post Request: ', req.body);
  BirdSightings.create({
    bird_id: req.body.bird_id,
    user_id: req.body.user_id,
  })
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err, 'Something went wrong');
      res.sendStatus(500);
    });
});

//Delete req to birdSightings database
app.delete('/api/birdsightings', (req, res) => {
  // console.log('Line 231 - Back End Bird Sightings Delete Request: ', req.body);
  BirdSightings.delete({
    bird_id: req.body.bird_id,
    user_id: req.body.user_id,
  })
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err, 'Something went wrong');
      res.sendStatus(500);
    });
});

//////////////////////TRIPS//////////////////////
//GET req for all trips data
app.get('/api/pastTrips', (req, res) => {
  console.log('get trips-----');

  Trips.findAll({
    where: {
      tripDate: {
        [Op.lt]: new Date(),
      },
    },
    order: [['tripDate', 'DESC']]
  })
    .then((trips) => {
      res.json(trips);
    })
    .catch((err) => {
      console.error('ERROR: ', err);
      res.sendStatus(404);
    });
});

app.get('/api/trips', (req, res) => {
  console.log('get trips-----');

  Trips.findAll({
    where: {
      tripDate: {
        [Op.gte]: new Date(),
      },
    },
    order: [['tripDate', 'ASC']]
  })
    .then((trips) => {res.json(trips)})
    .catch((err) => {
      console.error('ERROR: ', err);
      res.sendStatus(404);
    });
});

// use city to get coordinates from Google
app.get('/api/latLng', (req, res) => {
  const { city } = req.query;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
  .then(( response ) => {
  res.send(response.data.results[0].geometry.location)})
  .catch((err) => res.sendStatus(500));
});

//////////////////////WEATHER//////////////////////

app.get('/api/weather', (req, res) => {
  let lat = 29.9430
  let lng = -90.3517

  if(req.query.coordinates){
    const { coordinates } = req.query;
    const coords = JSON.parse(coordinates);
    lat = coords.lat;
    lng = coords.lng
  }
  axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=imperial&lang=en&exclude=minutely,hourly,alerts&appid=${process.env.WEATHER}`)
  .then(({ data } ) => res.json(data))
  .catch((err) => res.sendStatus(500));
})

// launches the server from localhost on port 3000
app.listen(PORT, () => {
  console.log(`
  Listening at: http://localhost:${PORT}
  `);
  console.log(process.env.WEATHER);
});
