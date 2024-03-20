const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect the user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// Google will redirect the user to this URL after authentication
router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    req.session.save(err => {
        if (err) {
            req.logout();
            res.sendStatus(500);
        } else {
            res.redirect(process.env.CLIENT_ORIGIN);
        }
    });
});

// Logout the user
router.get('/logout', async (req, res) => {
    req.session.destroy();
    // req.logout();
    res.redirect(process.env.CLIENT_ORIGIN);
});

module.exports = router;