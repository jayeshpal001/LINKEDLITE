const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/ProductSchema');
const products = require('../data/products');
const cloudinary = require('../config/cloudinary');
require('dotenv').config();

const uploadToCloudinary = async (localPath, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: 'shopfinity/products',
      public_id: fileName,
      use_filename: true,
      unique_filename: false,
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${fileName}:`, err.message);
    return null;
  }
};

const seedProducts = async () => {
  try {
    // 1. MongoDB Connect
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected at", connect.connection.host);

    // 2. Delete Old Data
    await Product.deleteMany({});
    console.log("Old products deleted");

    // 3. Upload each image to Cloudinary + update product.image
    const updatedProducts = [];

    for (const product of products) {
      const localPath = path.join(__dirname, '../public', product.image); // e.g. /images/img1.jpg
      const fileName = path.basename(product.image); // e.g. img1.jpg

      const cloudUrl = await uploadToCloudinary(localPath, fileName);
      if (cloudUrl) {
        product.image = cloudUrl;
        updatedProducts.push(product);
        console.log(`Uploaded ${fileName} => ${cloudUrl}`);
      }
    }

    // 4. Insert updated products to DB
    const inserted = await Product.insertMany(updatedProducts);
    console.log(`${inserted.length} products inserted into DB with Cloudinary images.`);

    process.exit();
  } catch (err) {
    console.error(" Error in seedProducts:", err);
    process.exit(1);
  }
};

seedProducts();
