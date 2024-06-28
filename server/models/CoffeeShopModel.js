import mongoose from 'mongoose';

const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
    rating: { type: Number },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'food' }]
  });
  
  const CoffeeShop = mongoose.model.CoffeeShop || mongoose.model('CoffeeShop', coffeeShopSchema);
  export default CoffeeShop;