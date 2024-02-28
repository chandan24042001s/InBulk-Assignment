const express=require("express");
const app=express();
const cors=require("cors")

require("dotenv").config();
const PORT= 5000;

app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

app.use(express.urlencoded({extended:false}))
app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:1234","https://in-bulk-chandan-assignment.vercel.app/",],
        methods:["POST", "GET", "PUT", "DELETE"],
        credentials:true,
    })
)
const dbConnect=require("./config/database");
dbConnect();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload=require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})