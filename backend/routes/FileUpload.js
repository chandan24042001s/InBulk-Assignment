const express=require("express");
const router=express.Router();

//api route
const {signUp}=require("../controllers/fileUpload");
router.post("/imageUpload",signUp);

module.exports=router;