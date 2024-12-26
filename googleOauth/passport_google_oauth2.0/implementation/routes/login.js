const express = require("express")
const router = express.Router()
const myPassport = require("../auth/passport");

const loginHandler = require("../controllers/login")
router.get("/", loginHandler.getLogin)
router.post("/", myPassport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user,"login.......done")
        res.redirect('/profile');
    }
)

router.get('/google',
    myPassport.authenticate('google', { scope: ['profile'] }));
  
router.get('/auth/google/callback', 
    myPassport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/profile');
    });

module.exports = router