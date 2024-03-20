/*

This file is for initializing passport.
Some of this file is provided for you.
Read this file and try to understand what
is happening.

*/

// Require passport dependency
var passport = require('passport')
// Require Google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Here you will require() anything else you need


// This defines what will be in the session cookie
passport.serializeUser(function (user, done) {
    done(null, user)
})
// Find the user from the session and use result in callback function
passport.deserializeUser(async (user, done) => {
    try {
        done(null, user)
    } catch (error) {
        console.error(error)
        done(error.message)
    }
})

// Here you will set up a connection to Google using variables from your .env file
const { getOrCreateUser } = require('./util');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`,
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // Here you will get the user from mongoDB using the function from ./util
            // let user = { UserName: "Fake User", Email: "Fake Email" } // replace this code
            let user = await getOrCreateUser(profile); 

            return done(null, user);
        } catch (error) {
            done(error)
        }
    }
));

// Initilize Session storage in MongoDB
const initStore = session => {
    const MongoDbStore = require(`connect-mongodb-session`)(session)
    const store = new MongoDbStore({
        uri: process.env.ATLAS_CONNECTION_STRING,
        collection: `Sessions`,
    }, err => {
        if (err) console.error(err)
        else console.log(`Session Store Initialized`)
    })
    store.on(`error`, console.error)
    return store
}

module.exports = initStore
