const GoogleStrategy =  require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

require('../models/User');
const User = mongoose.model('user');

module.exports = (passport) => {
    passport.use( new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
        // proxy: true --------------- add this for deployment on heroku or others!!(Important)
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile); -----------displays google profile data
        
        // Check for existing user
        User.findOne({
            googleID: profile.id
        }).then( user => {
            if (user) {
                done(null, user);
            } else {
                const newUser = new User({
                    googleID: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                })
                .save()
                .then( user => done(null, user));

            }
        })
    }
    ));

    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}