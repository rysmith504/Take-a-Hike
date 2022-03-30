// Import Dependencies
const express = require("express");
const path = require("path");
const router = express.Router();

// // Import DB
// const { db } = require('./database/index.js')

// // Import Routes
// const birdListRouter = require('./database/routes/birdListRouter.js')

// Set Distribution Path
const PORT = 5555;
const distPath = path.resolve(__dirname, "..", "dist"); //serves the hmtl file of the application as default on load

// Create backend API
const app = express();

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


// launches the server from localhost on port 5555
app.listen(PORT, () => {
  console.log(`
  Listening at: http://localhost:${PORT}
  `);
});


