const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const { globalLimiter } = require('./utils/rateLimiters');

// Route files
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const postRoutes = require('./routes/postRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

//  Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // allow loading images from other origins
}));

app.set("trust proxy", 1);

//  CORS config
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));

//  Rate Limiter (for global routes)
app.use(globalLimiter);

//  Useful Middleware
app.use(express.json());
app.use(cookieParser());
app.use(compression()); //  Compress all responses

//  Logging (Only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  Static File Handling (for images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // multer uploaded images

//  Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes)
app.use('/api', uploadRoutes); // image upload route
app.use('/search',searchRoutes); 
//  404 Not Found
app.use(notFound);

// Error Handler (centralized)
app.use(errorHandler);

module.exports = app;
