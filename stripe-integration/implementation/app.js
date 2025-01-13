const express = require('express');
const app = express();
const dotEnv=require("dotenv")
dotEnv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(express.json())
app.use(express.static('public'));
app.set("view engine","ejs")
const PORT=3030
const items = [
  { name: 'T-shirt', price: 2000, quantity: 1, description:"A comfortable cotton t-shirt",image: 'https://d1xv5jidmf7h0f.cloudfront.net/circleone/images/products_gallery_images/Custom-Printed-T-Shirt-Round-Neck.jpg' },
  { name: 'Coffee Mug', price: 1500, quantity: 2, description:"A stylish ceramic coffee mug", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_UjZMmVcOiKnb8Lzbu907WTnqCA7Tmg13nw&s' },
  { name: 'Notebook', price: 800, quantity: 3, description:"A handy notebook for daily use", image: 'https://www.thestylesalad.in/cdn/shop/products/him1_1024x1024_2x_77d00e04-776a-4c99-83e2-0070925df8f4.jpg?v=1542106281' },
];

app.get("/checkout",(req,res)=>{
    res.render('checkout',{publishKey:process.env.STRIPE_PUBLISHABLE_KEY,items})
})

app.get("/success",(req,res)=>{
    res.render('success')
})
app.get("/cancel",(req,res)=>{
    res.render('cancel')
})

app.post('/create-checkout-session', async (req, res) => {
  try {
    // Map items to Stripe's line_items format
    const lineItems = items.map(item => {
      const productData = {
        name: item.name,
        images: [item.image],
      };
      // Only add the description if it exists
      if(item.description && item.description.trim() !== ""){
        productData.description = item.description;
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: item.price*100, // price in dollars
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


// Handling 404 Errors (Page Not Found)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err);  // Optionally log the error for debugging
  res.status(500).json({ error: `Something went wrong! : ${err}` });
});

app.listen(PORT, (err) => 
  {
    if(err){
      console.log("error",err)
    }
    else{
      console.log(`Listening on Port ${PORT}`)
    }
  }
);