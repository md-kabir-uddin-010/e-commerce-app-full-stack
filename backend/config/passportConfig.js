const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Pepole = require("../models/Pepole");
const { findUserByEmail } = require("../services/auth/authService");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        const ExistingUser = await findUserByEmail(profile.emails[0].value);
        if (ExistingUser) {
          return cb(null, ExistingUser);
        }
        const newUser = new Pepole({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          profile_pic: profile.photos[0].value,
          verifyed: profile._json.email_verified,
          scope: profile.provider,
        });
        await newUser.save();
        return cb(null, newUser);
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
