const express=require("express");
const router=express.Router();

//api route
const {signUp,login}=require("../controllers/fileUpload");
router.post("/imageUpload",signUp);
router.post("/login",login);

module.exports=router;