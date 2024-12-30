const express = require("express")
const router = express.Router()
const myPassport = require("../auth/passport");

router.get('/google',
    myPassport.authenticate('google', { scope: ['profile'] }));
  
router.get('/auth/google/callback', 
    myPassport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/profile');
    });

module.exports = router