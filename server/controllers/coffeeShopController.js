import CoffeeShop from '../models/CoffeeShopModel.js';
import foodModel from '../models/foodModel.js';

export const listCoffeeShops = async (req, res) => {
    try {
        const coffeeShops = await CoffeeShop.find();
        res.status(200).json(coffeeShops);
    } catch (error) {
        console.error('Error fetching coffee shops:', error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

export const getCoffeeShopById = async (req, res) => {
    try {
        const coffeeShop = await CoffeeShop.findById(req.params.id);
        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }
        res.status(200).json(coffeeShop);
    } catch (error) {
        console.error('Error fetching coffee shop by ID:', error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
  
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
      coffeeShop: req.body.coffeeShop
    });
  
    try {
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

export const addCoffeeShop = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const coffeeShop = new CoffeeShop({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        image: image_filename,
        location: req.body.location,
        rating: req.body.rating
    });
    try {
        await coffeeShop.save();
        res.json({ success: true, message: "Coffee Shop Added" });
    } catch (error) {
        console.error('Error adding coffee shop:', error);
        res.json({ success: false, message: "Error" });
    }
};

export const updateCoffeeShop = async (req, res) => {
    try {
        const coffeeShop = await CoffeeShop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }
        res.status(200).json(coffeeShop);
    } catch (error) {
        console.error('Error updating coffee shop:', error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

export const deleteCoffeeShop = async (req, res) => {
    try {
        const coffeeShop = await CoffeeShop.findByIdAndDelete(req.params.id);
        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }
        res.status(200).json({ message: 'Coffee shop deleted' });
    } catch (error) {
        console.error('Error deleting coffee shop:', error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Get products for a specific coffee shop
export const getCoffeeShopProducts = async (req, res) => {
    try {
        const foods = await foodModel.find({ coffeeShop: req.params.id });
        res.json(foods);
    } catch (error) {
        console.error('Error fetching coffee shop products:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
};

// import CoffeeShop from '../models/CoffeeShopModel.js';
// // import Product from '../models/Product.js'; 
// import foodModel from '../models/foodModel.js';

// export const listCoffeeShops = async (req, res) => {
//     try {
//         const coffeeShops = await CoffeeShop.find();
//         res.status(200).json(coffeeShops);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getCoffeeShopById = async (req, res) => {
//     try {
//         const coffeeShop = await CoffeeShop.findById(req.params.id);
//         if (!coffeeShop) {
//             return res.status(404).json({ message: 'Coffee shop not found' });
//         }
//         res.status(200).json(coffeeShop);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const addCoffeeShop = async (req, res) => {
//     try {
//         const coffeeShop = new CoffeeShop(req.body);
//         await coffeeShop.save();
//         res.status(201).json(coffeeShop);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const updateCoffeeShop = async (req, res) => {
//     try {
//         const coffeeShop = await CoffeeShop.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!coffeeShop) {
//             return res.status(404).json({ message: 'Coffee shop not found' });
//         }
//         res.status(200).json(coffeeShop);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const deleteCoffeeShop = async (req, res) => {
//     try {
//         const coffeeShop = await CoffeeShop.findByIdAndDelete(req.params.id);
//         if (!coffeeShop) {
//             return res.status(404).json({ message: 'Coffee shop not found' });
//         }
//         res.status(200).json({ message: 'Coffee shop deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get products for a specific coffee shop
// export const getCoffeeShopProducts = async (req, res) => {
//     try {
//       const foods= await foodModel.find({ coffeeShop: req.params.id });  // Assuming you have a coffeeShop field in your Product model
//       res.json(foods);
//     } catch (error) {
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };