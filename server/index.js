import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import coffeeShopRoutes from './routes/coffeeShopRoutes.js';
// import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';



dotenv.config();

// app config
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/coffee-shops', coffeeShopRoutes);
app.use('/api/food', foodRouter); 
app.use('/images', express.static('uploads')); 
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
