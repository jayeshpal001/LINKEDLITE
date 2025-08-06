const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const OTPModel = require('../models/OTPModel');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');
const generateOtp = require('../utils/generateOtp');


const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body; 
     if (!email || !password) {
        res.status(400); 
        throw new Error("All fields are required"); 
      }
    const user = await User.findOne({email}); 
    if (!user) {
        res.status(401); 
        throw new Error("Invalid email or password"); 
    }
    if (!user.isVerified) {
        res.status(403);
        throw new Error("Please verify your email before loggin in. ");
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
        res.status(401); 
        throw new Error("Invalid email or password"); 
    }
    const plainOtp = generateOtp(); 
    const otpExpiry = Date.now()+5*60*1000; 
    const hashOtp = await bcrypt.hash(plainOtp, 10); 
    console.log("otp for login: ", plainOtp);
    
    await OTPModel.create({email, otp:hashOtp, otpExpiry})
    
     const message =  `
      <h2>Hello ${user.name},</h2>
      <p>Your login OTP is:</p>
      <h3>${plainOtp}</h3>
      <p>It is valid for 5 minutes only.</p>
    `;
    sendEmail(
        email, 
        "Verify user for login", 
        message
        
    )
    res.status(200).json({
        success: true,
        message: "Please verify your account, Otp send your email successfull", 
    })
})

module.exports = loginUser; 