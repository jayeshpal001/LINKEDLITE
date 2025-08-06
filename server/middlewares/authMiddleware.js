const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    console.log(`Requesting user: ${req.user.name}`);
    next();
})

module.exports = protect; 

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async(req, res, next) =>{
//     let token; 
//     try {
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//             token = req.headers.authorization.split(" ")[1]; 
//             const decode = await jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode.id);
//             req.user= await User.findById(decode.id); 
//             next();
//         }
//     } catch (error) {
//         res.status(500).json({error: error.message}); 
//     }
// }

// module.exports = protect; 