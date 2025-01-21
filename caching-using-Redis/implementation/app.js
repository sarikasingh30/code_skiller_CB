const express = require('express');
const { createClient } = require('redis');
const axios = require("axios")
const PORT = 8080;
const app = express();
app.use(express.json())
const client = createClient();

// Connection to Redis and handle connection errors
(async () => {
  try {
    // establishes a connection to the Redis server
    await client.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

const checkCache = async (req, res, next) => {
  // Extract the GitHub username(passed as params) from the URL
  const { username } = req.params;

  try {
    // Check if the username exists in the Redis cache
    const cachedData = await client.get(username);

    if (cachedData) {
      // If data exists in cache, return it with the source as 'cache'
      return res.status(200).json({
        source: 'cache',
        data: JSON.parse(cachedData)  // Redis stores data as strings, so parse it back to JSON
      });
    }
    // If no cache found, proceed to the route and fetch from API
    next();
  } catch (err) {
    console.error('Error checking cache:', err);
    // If error occurs, proceed to the route and fetch from API
    next();
  }
};

// defining the route 
app.get('/github/:username', checkCache, async (req, res) => {
  const { username } = req.params;
  try {
    // Fetching Data from GitHub API using axios
    const response = await axios.get(`https://api.github.com/users/${username}`);

    // Store the response in Redis with an expiration time of 1 hour (3600 seconds)

    await client.set(username, JSON.stringify(response.data), {
      EX: 3600,      // 1hr of expiration time
      NX: true       // data should only be set if it does not already exist in cache
    });

    // Sending Response to Client with source as API
    res.status(200).json({
      source: 'api',
      data: response.data,
    });
  } catch (err) {
    // Handling Errors
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Handling 404 Errors (Page Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Page not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err)                  // Optionally log the error for debugging
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Server error:', err);
  } else {
    console.log(`Listening on PORT: ${PORT}`);
  }
});
