const rateLimit  = require('express-rate-limit');

// For global limiter for all routes

const globalLimiter = rateLimit({
    windowMs: 15*60*1000, 
    max: 100, // Max 100 requests per IP
    message: "Too many requrests. Please try again leter.",
    standardHeaders: true, //  modern headers
    legacyHeaders: false   //  old headers
}); 

const loginLimiter = rateLimit({
    windowMs: 10*60*1000, 
    max: 50, 
    message: "Too many login attempts. Please try again in 10 minutes.", 
    standardHeaders: true, 
    legacyHeaders: false
})

module.exports = {
    globalLimiter, 
    loginLimiter
}