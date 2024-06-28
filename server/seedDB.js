import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CoffeeShop from './models/CoffeeShop.js';
// import Product from './models/Product.js';
import connectDB from './config/db.js';
import coffeeShops from './data/coffeeShops.js';
// import createProducts from './data/products.js';

dotenv.config();
connectDB();

// const seedData = async () => {
//   try {
//     // Clear existing data
//     await CoffeeShop.deleteMany({});
//     // await Product.deleteMany({});

//     // Create Coffee Shops
//     const insertedCoffeeShops = await CoffeeShop.insertMany(coffeeShops);
//     console.log('Inserted Coffee Shops:', insertedCoffeeShops);

//     // Create Products with coffee shop references
//     // const products = createProducts(insertedCoffeeShops);
//     // await Product.insertMany(products);

//     console.log('Data seeded successfully');
//     process.exit();
//   } catch (error) {
//     console.error('Error seeding data:', error);
//     process.exit(1);
//   }
// };

// seedData();

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import CoffeeShop from './models/CoffeeShop.js';
// import Product from './models/Product.js';
// import coffeeShops from './data/coffeeShops.js';
// import products from './data/products.js';

// dotenv.config();

// connectDB();

// const importData = async () => {
//   try {
//     await CoffeeShop.deleteMany();
//     await Product.deleteMany();

//     const createdCoffeeShops = await CoffeeShop.insertMany(coffeeShops);
//     const homeCoffeeRoasters = createdCoffeeShops[0]._id;
//     const hausCoffee = createdCoffeeShops[1]._id;

//     const sampleProducts = products.map((product) => {
//       if (product.coffeeShop === 'ID_OF_HOME_COFFEE_ROASTERS') {
//         return { ...product, coffeeShop: homeCoffeeRoasters };
//       }
//       if (product.coffeeShop === 'ID_OF_HAUS_COFFEE') {
//         return { ...product, coffeeShop: hausCoffee };
//       }
//       return product;
//     });

//     await Product.insertMany(sampleProducts);

//     console.log('Data Imported!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await CoffeeShop.deleteMany();
//     await Product.deleteMany();

//     console.log('Data Destroyed!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
