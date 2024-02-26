

const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController')

router.post('/signup', userController.signUp);

router.post('/send-otp', userController.sendOtp)
router.post('/verify-otp', userController.verifyOtp)

module.exports = router;
