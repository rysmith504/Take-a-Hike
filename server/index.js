//Dependencies
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const session = require('express-session')
const passport = require('passport');
const { isLoggedIn } = require('./middleware/authFunctions.js')
require('./middleware/auth.js')

//handles parsing content in the req.body from post/update requests
app.use(express.json());

//serves the hmtl file of the application as default on load
const distPath = path.resolve(__dirname, "..", "dist");

app.use(express.static(distPath));

//Auth Routes

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>')
});

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile'] })
)

app.get('/google/callback', 
passport.authenticate('google', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure',
})
)

app.get('/auth/failure', (req, res) => {
  res.send('did not authenticate');
})

app.get('/auth/success', isLoggedIn, (req, res) => {
  res.send('Hello.');
})

//Auth Routes end

router.get('/login', function(req, res, next) {
  res.render('login')
});


// launches the server from localhost on port 5555
let PORT = 5555;
app.listen(PORT, () => {
  console.log(`
  Listening at: http://localhost:${PORT}
  `);
});

//app.use(express.urlencoded({ extended: true }));
