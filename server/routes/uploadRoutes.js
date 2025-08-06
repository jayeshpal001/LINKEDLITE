const express = require('express');
const upload = require('../middlewares/multerConfig');
const imageController = require('../controllers/imageController');
const router = express.Router(); 


router.post('/upload/image', upload.single('image'), imageController); 

module.exports = router; 