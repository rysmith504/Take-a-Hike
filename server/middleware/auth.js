//todo 
// first i need to create a new project in google developers console
// then i will be given a client ID and client secret which must be provided to passport
// then i will need to configure a redirect URI with matches the rout in our application.
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database/models/users.js')



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5555/google/callback",
  passReqToCallback: true
},
  async (req, accessToken, refreshToken, profile, done) => {
  // console.log(profile)
  const defaultUser = {
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    email: profile.emails[0].value,
    picture: profile.photos[0].value,
    googleId: profile.id,
  }

  const user = await Users.findOrCreate({ where: { google: profile.id }, defaults: defaultUser}).catch((err) => {
    console.log("Error signing up", err)
    done(err, null)
  });

  if(user && user[0]){
    return done(null, user && user[0])
  }
}
));

passport.serializeUser((user, done) => {
  console.log("Serializing User:", user)
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  console.log()
  const user = await Users.findOne({ where: { id} }).catch((err) => {
    console.log("error deserializing", err);

    if(user){
      done(null, user);
    }
  })
  done(null, user);
});