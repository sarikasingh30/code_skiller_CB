const express = require("express")
const session = require("express-session")
const mongoose = require('mongoose');
const MongoStore=require("connect-mongo")
const passport=require("passport")
const app = express()
const dotEnv = require("dotenv")
const profileHandler = require("./routes/profile")
const loginHandler = require("./routes/login")
const PORT = 3030
dotEnv.config()
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    return res.redirect("/login")
})
app.use("/login", loginHandler)
app.use("/profile", profileHandler)
app.get("/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('database Connected!')
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`Listening on PORT ${PORT}`)
            }
        })
    }).catch((err) => console.log(err));