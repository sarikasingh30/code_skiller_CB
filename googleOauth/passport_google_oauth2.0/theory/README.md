# Google OAuth Integration
Google OAuth integration allows users to authenticate their identity using their Google account. This process is often used in web applications to offer easy, secure login via Google, avoiding the need for users to create a separate account

## Steps for Google OAuth Integration

### Step 1 : Setup a basic Node.js App

```    
npm init -y
```
Now, create **app.js** file for the Node.js backend server.

```
// File: app.js

const express=require("express")
const app=express()
const PORT=3030
app.use(express.json())

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on PORT: ${PORT}`)
    }
})
```

### Step 2 : Install the required dependencies
- **passport** — Middleware for handling authentication in Node.js and Express applications.

- **passport-google-oauth20** — A Passport strategy that enables authentication via Google, allowing users to log in using their Google account.

```
npm i express mongoose ejs bcrypt dotenv express-session passport passport-google-oauth20
```

### Step 3 : Create **.env** file and add MongoDB Url and Secret Key to it.
- **.env file** is used to store sensitive information.
- Now, we save the MongoDB URL of the MongoDB Atlas and the Secret Key for the session

```
MONGO_URL=""
SECRET_KEY=""    
```

### Step 4 : Set up a Google Developer Console Project
1. Visit the Google Developer Console.
2. Create a new project or select an existing one.
3. Enable the Google+ API or Google Identity Platform for your project.
4. Set up OAuth 2.0 credentials:
5. Go to the Credentials tab.
6. Click on Create Credentials → OAuth 2.0 Client IDs.
7. Set the Authorized redirect URIs 
    (e.g., http://localhost:3030/login/google and http://localhost:3000/login/auth/google/callback for local development).
8. Note down the **Client ID** and **Client Secret**. These will be used in the OAuth flow.
9. To use these credentials, save them in a **.env** file.

    ```
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    ```

### Step 5 : Connect to MongoDB database using mongoose in app.js

```
// File: app.js

const express = require("express")
const mongoose = require('mongoose');
const app = express()
const dotEnv = require("dotenv")
const PORT = 3030
dotEnv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

```

### Step 6 : Set up the View engine as ejs to get HTML for Login and Profile Page

```
// File: app.js

const express = require("express")
const mongoose = require('mongoose');
const app = express()
const dotEnv = require("dotenv")
const PORT = 3030
dotEnv.config()
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

```
### Step 7 : Create **login.ejs** and **profile.ejs** files for login and profile page respectively.

- login.ejs
    ```
    // File: views/login.ejs 

    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    </head>

    <body>
    <h1>Login Page</h1>

    <div>
        <a href="/login/google">
        <button>Login Using Google</button>
        </a>
    </div>

    </body>

    </html>
    ```
- profile.ejs
    ```
    // File: views/profile.ejs

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Welcome <%= username %> to the Profile Page</h1>
        
        <a href="/logout">
            <button >LOGOUT</button>
        </a>
    </body>
    </html>
    ```

### Step 8 : Create **user** model
The User model defines the structure of the user data in the database.
```
// File: models/user.js

const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    googleId:{type:String},
    googleAccessToken:{type:String},
    username: {type:String}
    
})
module.exports=mongoose.model("user", userSchema)
```

- **googleId**: This field stores the unique Google ID of the user, which is used for identifying the user after they authenticate via Google OAuth.

- **googleAccessToken**: This field stores the access token received after a user logs in through Google. The access token is used to make authorized requests to Google services on behalf of the user.

- **username:** This field stores the username of the user. It will be extracted from the user's Google profile after authentication.

