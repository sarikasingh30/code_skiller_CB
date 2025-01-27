const express=require("express")
const app=express()
const PORT=3030
app.use(express.json())

// GET Route
app.get("/",(req,res)=>{
    res.status(200).json({
        "msg":"Hi!... this is my node app..."
    })
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on PORT: ${PORT}`)
    }
})