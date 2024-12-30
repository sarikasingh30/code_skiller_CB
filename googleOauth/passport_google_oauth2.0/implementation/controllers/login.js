const path=require("path")

const filepath=path.join(__dirname,"../views/login.ejs")
module.exports.getLogin=(req,res)=>{
    if(req.user){
        return res.redirect("/profile")   //  Redirect to profile if user is already logged in
    }
    res.render(filepath);                 // Render the login page if user is not logged in
}

