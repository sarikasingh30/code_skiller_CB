const express = require("express")
const mongoose = require('mongoose');
const redis = require("redis");
const app = express()
const dotEnv = require("dotenv")    // import dotenv npm package
const PORT = 5001
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
  
  const subscriberClient = redis.createClient();
  
  // Connect Redis Subscriber
  subscriberClient.connect();
  
  // Subscribe to book creation events
  subscriberClient.subscribe("bookCreated", async (message) => {
    const bookData = JSON.parse(message);
    console.log("Received new book event:", bookData);
  });
  
  app.get("/books/:id", async (req, res) => {
      try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        
        res.json(book);
      } catch (error) {
        res.status(500).json({ error: error.message });
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