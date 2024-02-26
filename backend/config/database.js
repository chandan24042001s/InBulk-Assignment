const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB connected Sucessfully")
    })
    .catch((err)=>{
        console.log("DB Connection issues");
        console.error(err);
        process.exit(1);
    })
    
}

module.exports=dbConnect;