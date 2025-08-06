const asyncHandler = require('express-async-handler');
const OTPModel = require('../models/OTPModel');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');
const verifyLoginOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400);
        throw new Error("Please Enter all fields");
    }
    const isExists = await OTPModel.findOne({ email });
    if (!isExists) {
        res.status(400);
        throw new Error("OTP not found or expired");
    }
    if (isExists.otpExpiry < Date.now()) {
        await OTPModel.deleteOne({ email });
        res.status(400);
        throw new Error("OTP expired");
    }
    const isMatch = await bcrypt.compare(otp, isExists.otp); 
    if (!isMatch) {
        res.status(400); 
        throw new Error("Invalid OTP");
    }
    const user = await User.findOne({email}); 
    if (!user) {
        res.status(404); 
        throw new Error("User not Found");
    }
    await OTPModel.deleteOne({email}); 
   const token =   generateJWT(res, user._id); 
    res.status(200).json({
        success: true, 
        message: "Login successfull",  
        token,
        user
    })
})

module.exports = verifyLoginOtp; 