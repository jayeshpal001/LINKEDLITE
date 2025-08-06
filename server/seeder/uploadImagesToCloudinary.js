// const path = require('path');
// const fs = require('fs');
// const cloudinary = require('../config/cloudinary');

// // Folder jisme local images hai
// const imagesFolder = path.join(__dirname, '../public/images');

// const uploadImages = async () => {
//   const imageFiles = fs.readdirSync(imagesFolder);

//   for (const file of imageFiles) {
//     const filePath = path.join(imagesFolder, file);
//     try {
//       const result = await cloudinary.uploader.upload(filePath, {
//         folder: 'shopfinity/products', // cloudinary folder
//         use_filename: true,
//         unique_filename: false,
//       });

//       console.log(` Uploaded ${file} -> ${result.secure_url}`);
//     } catch (err) {
//       console.error(` Failed to upload ${file}:`, err.message);
//     }
//   }

//   console.log(" All images uploaded.");
// };

// uploadImages();
