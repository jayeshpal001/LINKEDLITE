const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    otp: {
        type: String,
        required: true,
    },
    otpExpiry: {
        type: Date,
        required: true,
        index: { expires: '0s' }
    }
}, { timestamps: true });

module.exports = mongoose.model("OTPModel", OTPSchema); 