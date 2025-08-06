const mongoose = require('mongoose');

const tempUserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"], 
        minlength: [3, "Name must be at least 3 characters"], 
        trim: true   // Remove unwanted space 
    }, 
    email: {
        type: String, 
        required: [true, "Email is required"], 
        trim: true, 
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, "Invalid email format"]  // regex for email format
    },
    password:{
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 Characters"]
        
    },
    createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // document auto-deletes in 5 min
  }
})

module.exports = mongoose.model("TempUser", tempUserSchema); 