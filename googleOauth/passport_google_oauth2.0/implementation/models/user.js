const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    googleId:{type:String},
    googleAccessToken:{type:String},
    username: {type:String}
    
})
module.exports=mongoose.model("user", userSchema)