const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const TempUser = require('../models/TempUserSchema');
const OTPModel = require('../models/OTPModel');
const bcrypt = require('bcrypt');
const verifyRegisterOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400);
        throw new Error("Email and OTP are required");
    }
    const existing = await OTPModel.findOne({ email });
    if (!existing) {
        res.status(400);
        throw new Error("Invalid OTP or EMAIL");
    }
    if (existing.otpExpiry < Date.now()) {
        await OTPModel.deleteOne({ email });
        await TempUser.deleteOne({ email });
        res.status(400);
        throw new Error("OTP expired");
    }
    const isMatch = await bcrypt.compare(otp, existing.otp);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid OTP");
    }
    const tempUser = await TempUser.findOne({email}); 
    if (!tempUser) {
        res.status(400); 
        throw new Error("User data not found");
    }

    const user = await User.create({
        name: tempUser.name, 
        email: tempUser.email,  
        password: tempUser.password,
        isVerified: true
    })

    await OTPModel.deleteOne({ email })
    await tempUser.deleteOne({email}); 

    res.status(200).json({ success: true, message: "Email verified successfully", user });
})
module.exports = verifyRegisterOTP; 