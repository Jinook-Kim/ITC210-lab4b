const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const logger = require(`morgan`)
const cors = require(`cors`)
const { authenticate } = require(`./util`)
const session = require(`express-session`)
const passport = require('passport'); // Require passport from packages
const mongoose = require('./mongoose');
const authRouter = require('./routes/auth');
const userRouter = require(`./routes/user`) // use this as a guide for your other routes
const store = require(`./passport`)(session)
const tasksRouter = require(`./routes/tasks`)

const app = express()

// These lines are provided for you.
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
})) // CORS will allow a front end specified in the .env to have access to restricted resources.
app.use(logger(`dev`)) // This line is for having pretty logs for each request that your API receives.
app.use(express.json()) // This line says that if a request has a body, that your api should assume it's going to be json, and to store it in req.body.
app.use(express.urlencoded({ extended: false })) // This line says that if there's any URL data, that it should not use extended mode.
app.use(cookieParser()) // This line says that if there are any cookies, that your app should store them in req.cookies.

// Here is where you should use the `express-session` middleware
// Session setup
const sess = {
    secret: process.env.SESSION_SECRET,
    name: 'it210_session',
    cookie: {
        maxAge: 604800000 // 1 week
    },
    resave: false,
    saveUninitialized: true,
    store
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    sess.cookie.sameSite = 'none' // allow cookie to be sent to different URL
}

app.use(session(sess))
app.use(passport.initialize());
app.use(passport.session());

// Here is where you should assign your routers to specific routes. Make sure to authenticate() the routes that need authentication.
app.use(`/api/v1/user`, authenticate, userRouter) // use this as a guide for your other routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authenticate, tasksRouter);

module.exports = app
