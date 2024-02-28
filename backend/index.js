//initialize library
const express=require("express");
const app=express();
const cors=require("cors")


//find PORT
require("dotenv").config();
const PORT= 5000;


//api create
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//connect with middleware
app.use(express.urlencoded({extended:false}))
app.use(
    cors({
        origin:["http://localhost:3000/","http://localhost:1234/","https://in-bulk-chandan-assignment.vercel.app/",],
        methods:["POST", "GET", "PUT", "DELETE"],
        credentials:true,
    })
)

//Database Connection
const dbConnect=require("./config/database");
dbConnect();

//Cloudinary Connection
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//API Mount karo
const Upload=require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//Activate Server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})