import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import coffeeShopRoutes from './routes/coffeeShopRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';


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

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("dir", __dirname);

// Serve static files from the React frontends
app.use('/admin/', express.static(path.join(__dirname, '../admin/dist')));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Serve index.html on unmatched routes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../admin/dist/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
