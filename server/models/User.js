const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"], 
        minlength: [3, "Name must be at least 3 characters"], 
        trim: true,
        index: true  // Standard index for exact matching
    }, 
    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, "Invalid email format"]
    },
    password: {
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 Characters"]
    },
    bio: {
        type: String,
        trim: true
    },
    // New search-optimized fields
    headline: {
        type: String,
        trim: true,
        maxlength: 120
    },
    skills: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    location: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
}, { timestamps: true });

// Compound text index for full-text search (weights determine priority)
userSchema.index({
    name: 'text',
    headline: 'text',
    bio: 'text',
    skills: 'text'
}, {
    weights: {
        name: 10,       // Highest priority
        headline: 5,
        skills: 3,
        bio: 1
    },
    name: 'user_search_index'
});

const User = mongoose.model('User', userSchema);
module.exports = User;