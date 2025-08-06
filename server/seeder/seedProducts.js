// const mongoose = require('mongoose');
// const Product = require('../models/ProductSchema');
// const products = require('../data/products');
// require('dotenv').config();

// const seedProducts = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected at", connect.connection.host);

  
//     await Product.deleteMany({});
//     console.log("🧹 Old products deleted");


//     const inserted = await Product.insertMany(products);
//     console.log(`${inserted.length} products inserted`);

//     process.exit(); 
//   } catch (error) {
//     console.error("Error seeding data:", error);
//     process.exit(1);
//   }
// };

// seedProducts();
