//todo 
// first i need to create a new project in google developers console
// then i will be given a client ID and client secret which must be provided to passport
// then i will need to configure a redirect URI with matches the rout in our application.

const express = require('express');
const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login')
});

module.exports = router;