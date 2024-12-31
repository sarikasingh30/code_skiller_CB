const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose");
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
    secret: process.env.SECRET_KEY,  // Secret key for session encryption
    resave: false,                  // Prevent session resaving if unmodified
    saveUninitialized: true,       // Save sessions even if uninitialized
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }) // Store sessions in MongoDB
}))

app.use(passport.initialize());   // middleware initializes passport.js in the application
app.use(passport.session());     //  middleware enables session-based authentication in the application.

app.get("/", (req, res) => {
    return res.redirect("/login")
})
app.use("/login", loginHandler)
app.use("/profile", profileHandler)
app.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);  // Pass the error to the error-handling middleware
        }
        res.redirect('/login');
    });
});

// Handling 404 Errors (Page Not Found)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err);  // Optionally log the error for debugging
    res.status(500).json({ error: 'Something went wrong!' });
});

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
    }).catch((err) => console.log("database connection error:",err));