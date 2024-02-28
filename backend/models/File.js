const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
  
});



const File=mongoose.model("File",fileSchema);
module.exports=File;