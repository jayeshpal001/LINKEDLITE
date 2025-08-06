const expressAsyncHandler = require("express-async-handler");

const imageController = expressAsyncHandler(async(req, res)=>{
    if (!req.file) {
        res.status(400); 
        throw new Error("No image uploaded");
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; 
    res.status(200).json({imageUrl}); 
})

module.exports = imageController; 