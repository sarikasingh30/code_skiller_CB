const express=require("express")
const Razorpay=require("razorpay")
const path = require('path');
const dotEnv=require("dotenv")
const crypto = require("crypto");
const {v4: uuidv4} =require("uuid")
dotEnv.config()
const app=express()
const PORT=8080
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
filepath=path.join(__dirname,"/views/index.ejs")

// Check if Environment Variables are Loaded
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Error: Missing essential environment variables.");
    process.exit(1);  // Exit the application if environment variables are missing
} 
else {
    console.log("Environment variables are loaded correctly.");
}

// initializing razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.get("/", (req, res) => {
    res.render(filepath);
});

// API Route "/order"

app.post('/order', async (req, res) => {
    
    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount*100,    // changing paise in rupees
        currency: req.body.currency,
        receipt: uuidv4(),             // used uuid package to create unique receipt field
        payment_capture: 1
    };
    try {
        // Sending a request to Razorpay(Sending order information from NodeJS Server to Razorpay Server)
        const response = await razorpay.orders.create(options)
        // returning response(Received from Razorpay) to the frontend
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
});




app.post("/verify-payment", (req, res) => {
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", keySecret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ status: "success", message: "Payment verified" });
  } else {
    res.status(400).json({ status: "failure", message: "Invalid signature" });
  }
});
// Handling 404 Errors (Page Not Found)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err);  // Optionally log the error for debugging
    res.status(500).json({ error: `Something went wrong! : ${err}` });
});
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on PORT: ${PORT}`)
    }
})




