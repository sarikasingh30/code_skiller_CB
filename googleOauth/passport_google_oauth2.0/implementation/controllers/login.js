const path=require("path")
const Users=require("../models/user")
const bcrypt=require("bcrypt")

const filepath=path.join(__dirname,"../views/login.ejs")
module.exports.getLogin=(req,res)=>{
    if(req.user){
        return res.redirect("/profile")
    }
    res.render(filepath);
}

