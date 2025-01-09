const express = require('express');
const app = express();
const dotEnv=require("dotenv")
dotEnv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(express.json())
app.use(express.static('public'));
app.set("view engine","ejs")
const PORT=3030

app.get("/checkout",(req,res)=>{
    res.render('checkout',{publishKey:process.env.STRIPE_PUBLISHABLE_KEY})
})
app.get("/success",(req,res)=>{
    res.render('success')
})
app.get("/cancel",(req,res)=>{
    res.render('cancel')
})

app.post('/create-checkout-session', async (req, res) => {
  try {
    
    const items = req.body.items; // Receive the items from the frontend
    // Map items to Stripe's line_items format
    const lineItems = items.map(item => {
      const productData = {
        name: item.name,
        images: [item.image],
      };
    
      // Only add the description if it exists
      if (item.description && item.description.trim() !== "") {
        productData.description = item.description;
      }
    
      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: item.price, // Price in cents
        },
        quantity: item.quantity,
      };
    });
    
    
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:${PORT}/success`,
      cancel_url: `http://localhost:${PORT}/cancel`,
    });

    // Send the session URL back to the frontend
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(PORT, (err) => 
    {
        if(err){
            console.log("error",err)
        }
        else{
            console.log(`Listening on Port ${PORT}`)
        }
});