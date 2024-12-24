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

// initializing razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.get("/", (req, res) => {
    res.render(filepath);
});
app.post('/order', async (req, res) => {
    
    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount*100,
        currency: req.body.currency,
        receipt: uuidv4(),
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
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

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on PORT: ${PORT}`)
    }
})