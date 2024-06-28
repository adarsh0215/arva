import express from "express";
import { addFood, listFood, removeFood, listFoodByShop } from "../controllers/foodController.js";
import multer from "multer";
import CoffeeShop from "../models/CoffeeShopModel.js";

const foodRouter = express.Router();

// Image storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return  cb(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
foodRouter.get('/listByShop/:shopId', listFoodByShop); // New route for fetching products by shop ID



export default foodRouter;

