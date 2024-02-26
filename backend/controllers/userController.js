// controllers/authController.js

const User = require('../models/user');
require("dotenv").config();

const otpModel = require('../models/otp')
const otpVerification = require('../helper/otpValidate')

const twilio = require('twilio')
const otpGenerator = require('otp-generator')

// const accountSid =process.env.ACCOUNTSID;
// const authToken =process.env.AUTHTOKEN;

const accountSid = "AC25569a1b07d7525d8fdfbd2a4f11fe6c";
const authToken = "9680e0db12c1c2bacabeb200e2eee1a4";

// const accountSid ="ACf8efe8c03343c31981f62c43b4574555";
// const authToken ="37c769044fe1e5a86b66c277f7f2cbc0";

const twilioClient = new twilio(accountSid, authToken);

const signUp = async (req, res) => {
  try {
    // Create a new user
    const { phoneNumber, name, email, photo } = req.body;
    const user = new User({ phoneNumber, name, email, photo });
    await user.save();
    res.json({ 
        success: true,
        message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message });
  }
};

const sendOtp = async (req, res) => {
    try{
        const {phoneNumber} = req.body;

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false ,
        specialChars: false,
        lowerCaseAlphabets: false,
        })

        const cDate = new Date()

        await otpModel.findOneAndUpdate({ phoneNumber }, 
            { otp, otpExpiration: new Date(cDate.getTime())},
            { upsert: true, new: true }
            );
        
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            to: phoneNumber,
            from: "+15169286930",
        })

        return res.status(200).json({
            success: true,
            msg: 'OTP Sent Successfully'
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const verifyOtp = async (req, res)=>{
    try{
        const { phoneNumber, otp } = req.body

        const otpData = await otpModel.findOne({
            phoneNumber, 
            otp
        })

        if(!otpData){
            return res.status(400).json({
                success: false,
                msg: "Wrong OTP Entered"
            })
        }

        const isOtpExpired = await otpVerification(otpData.otpExpiration);

        if(isOtpExpired){
            return res.status(400).json({
                success: false,
                msg: "Your OTP has been expired"
            })
        }
        return res.status(200).json({
            msg: "OTP Verified Successfully"
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    sendOtp,
    verifyOtp,
    signUp
}