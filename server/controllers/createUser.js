const User = require('../models/User');
const TempUser = require('../models/TempUserSchema');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');
const generateOtp = require('../utils/generateOtp');
const OTPModel = require('../models/OTPModel');
const bcrypt = require('bcrypt');

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio, headline, skills, location } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const isExists = await User.findOne({ email });
  if (isExists) {
    res.status(409);
    throw new Error("Email already exists");
  }

  const hashPass = await bcrypt.hash(password, 10);
  await TempUser.create({
    name,
    email,
    password: hashPass,
    bio,
    headline,
    skills,
    location
  });

  const otp = generateOtp();
  const otpExpiry = Date.now() + 5 * 60 * 1000;
  const hashOtp = await bcrypt.hash(otp, 10);

  await OTPModel.create({ email, otp: hashOtp, otpExpiry });

  if (process.env.NODE_ENV !== "production") {
    console.log(`OTP for ${email}: ${otp}`);
  }

  await sendEmail(
    email,
    "Email Verification",
    `<h1>Hello ${name}, welcome to our platform. Your OTP is: <strong>${otp}</strong></h1>`
  );

  res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email",
  });
});

module.exports = createUser;
