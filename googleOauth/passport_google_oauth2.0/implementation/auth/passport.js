const passport = require("passport")
const User = require("../models/user")
const dotEnv = require("dotenv")
dotEnv.config()

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/login/auth/google/callback",
    scope: ['profile', 'email']
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log("AccessToken", accessToken)
        // console.log("refreshToken", refreshToken)
        // console.log("profile", profile)

        try {
            let user = await User.findOne({
                googleId: profile.id
            })
            if (user) return cb(null, user)
            user = await User.create({
                googleAccessToken: accessToken,
                googleId: profile.id,
                username: profile.displayName,

            })
            cb(null, user)
        } catch (err) {
            cb(err, false)

        }

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null);
    }

});

module.exports = passport