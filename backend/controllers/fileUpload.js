const File=require("../models/File")
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require('path');

// /file supported check karne ka logic
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
  }
  
  //cloudinary mey upload ka logic
  async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    options.resource_type = "auto";
    console.log("temp file path", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }

  //image upload ka handler
  exports.signUp=async(req,res)=>{
    try{

        let imageUrl='';
        //data fetch
        const {phoneNumber,name,email}=req.body;
        console.log(phoneNumber,name,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        // Validate file type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file Type",fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
            success: false,
            message: "File format not supported",
          });
        }

        //file format supported hai
        console.log("uploading to inBulk");
        const response=await uploadFileToCloudinary(file,"OfficeBanao");
        console.log(response);

        //db mey entry save karni hey
        const fileData=await File.create({phoneNumber,name,email,imageUrl});

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully uploaded',
        })
    
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
  }

