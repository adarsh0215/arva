import { log } from "console";
import CoffeeShop from "../models/CoffeeShopModel.js";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
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

    // Find the coffee shop and update its products list
    const coffeeShop = await CoffeeShop.findById(req.body.coffeeShop);
    if (coffeeShop) {
      coffeeShop.products.push(food._id);
      await coffeeShop.save();
      res.status(201).json({ success: true, message: "Food Added", food });
    } else {
      res.status(404).json({ success: false, message: 'Coffee shop not found' });
    }
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}



const listFoodByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const foods = await foodModel.find({ coffeeShop: shopId });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood, listFoodByShop };



