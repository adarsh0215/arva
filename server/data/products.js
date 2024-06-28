

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const createProducts = (coffeeShops) => {
  if (!coffeeShops || coffeeShops.length === 0) {
    throw new Error('No coffee shops available to create products');
  }

  return [
    {
      name: 'Espresso',
      price: 3.5,
      category: 'Coffee',
      coffeeShop: new ObjectId(coffeeShops[0]._id),
      imageUrl: 'https://example.com/espresso.jpg',
      description: 'A strong and bold espresso shot',
    },
    {
      name: 'Latte',
      price: 4.5,
      category: 'Coffee',
      coffeeShop: new ObjectId(coffeeShops[1]._id),
      imageUrl: 'https://example.com/latte.jpg',
      description: 'A creamy latte with steamed milk',
    },
    {
      name: 'Cappuccino',
      price: 4.0,
      category: 'Coffee',
      coffeeShop: new ObjectId(coffeeShops[2]._id),
      imageUrl: 'https://example.com/cappuccino.jpg',
      description: 'A rich and frothy cappuccino',
    },
    // Add more products as needed
  ];
};

export default createProducts;

