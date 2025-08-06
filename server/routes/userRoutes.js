const express = require('express');
const createUser = require('../controllers/createUser');
const loginUser = require('../controllers/loginUser');
const { loginLimiter } = require('../utils/rateLimiters');
const verifyRegisterOTP = require('../controllers/verifyRegisterOTP');
const verifyLoginOtp = require('../controllers/verifyLoginOtp');
const profile = require('../controllers/profile');
const protect = require('../middlewares/authMiddleware');
const logout = require('../controllers/logoutUser');


const router = express.Router(); 

router.post('/register', createUser);
router.post('/login',loginLimiter, loginUser); 
router.post('/register/verify-otp',loginLimiter, verifyRegisterOTP) 
router.post('/login/verify-otp', verifyLoginOtp) 
router.get('/profile',protect, profile)
router.get('/logout', logout)
module.exports = router; 