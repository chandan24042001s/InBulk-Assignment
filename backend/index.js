const express=require("express");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT|| 5000;

app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

const dbConnect=require("./config/database");
dbConnect();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload=require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})