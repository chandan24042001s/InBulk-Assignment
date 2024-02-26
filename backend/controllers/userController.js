// controllers/authController.js

const User = require('../models/user');
const OTPService = require('../services/otpService');

exports.signUp = async (req, res) => {
  try {
    // Create a new user
    const { mobileNumber, name, email, photo } = req.body;
    const user = new User({ mobileNumber, name, email, photo });
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

exports.login = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    // Validate OTP
    if (OTPService.verifyOTP(mobileNumber, otp)) {
      const user = await User.findOne({ mobileNumber });
      if (user) {
        res.json({ 
            success: true, 
            message: 'Login successful', user });
      } else {
        res.status(404).json({ 
            success: false, 
            message: 'User not found' });
      }
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        message: error.message });
  }
};
