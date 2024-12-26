const path=require("path")
const filepath2=path.join(__dirname,"../views/profile.ejs")

module.exports.getProfile=(req,res)=>{
    console.log(req.user)
    if(!req.user){
        return res.redirect("/login")
    }
    res.render(filepath2,{username:req.user.username});
}