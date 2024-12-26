const express=require("express")
const router=express.Router()
const profileHandler=require("../controllers/profile")
router.get("/",  profileHandler.getProfile)
module.exports=router