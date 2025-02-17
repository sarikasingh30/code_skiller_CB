const express = require("express")
const mongoose = require('mongoose');
const redis = require("redis");
const app = express()
const dotEnv = require("dotenv")    // import dotenv npm package
const PORT = 5000
dotEnv.config()                     // configuring dotenv
//Express.js Middleware
app.use(express.json())
//Express.js Middleware
app.use(express.urlencoded({ extended: true }))

// Define a simple Book schema
const Book = mongoose.model("Book", {
    title: String,
    author: String,
    publishedYear: Number,
    });
// Create Redis Publisher
const redisClient = redis.createClient();

redisClient.connect();

// ** Create a New Book (Command) **
app.post("/books", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();

        // Publish event to Redis
        const msg="Hi, book is created...."
        await redisClient.publish("bookCreated", JSON.stringify(msg));
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

mongoose.connect(process.env.MONGO_URL)               // fetching MONGO_URL from .env file
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