# Google OAuth Integration
Google OAuth integration allows users to authenticate their identity using their Google account. This process is often used in web applications to offer easy, secure login via Google, avoiding the need for users to create a separate account

## Steps for Google OAuth Integration

### Step 1 : Setup a basic Node.js App

```    
npm init -y
```
Now, create **app.js** file for the Node.js backend server.

```
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
//app.js

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
//app.js

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
### Step 7 : Create **login.ejs** and **profile.ejs** files.

- login.ejs
    ```
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