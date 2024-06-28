import express from 'express';
import multer from 'multer';
import { addCoffeeShop, listCoffeeShops, getCoffeeShopById, updateCoffeeShop, deleteCoffeeShop } from '../controllers/coffeeShopController.js';

const router = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/add', upload.single('image'), addCoffeeShop);
router.get('/list', listCoffeeShops);
router.get('/list/:id', getCoffeeShopById);
router.put('/update/:id', upload.single('image'), updateCoffeeShop);
router.delete('/remove/:id', deleteCoffeeShop);

export default router;
