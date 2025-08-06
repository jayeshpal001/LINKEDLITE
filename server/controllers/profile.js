const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const profile = asyncHandler(async(req, res)=>{
    if (!req.user) {
        res.status(404)
        throw new Error("User not Found");
    }
    res.status(200).json({
       user: req.user
    })
    // const user = await User.find(); 
    // res.status(200).json({
    //     user
    // })
})

module.exports = profile; 