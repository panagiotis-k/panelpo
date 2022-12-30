import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Panagiotis',
      email: 'panagiotiskordas92@gmail.com',
      password: bcrypt.hashSync('alaska8971'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'anyemail@will.do',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Pokemon Red',
      sku: '000-000-111',
      category: 'Gameboy Games',
      image: '/assets/pokemon-red.jpg',
      price: 20,
      countInStock: 10,
      brand: 'Nintendo',
      rating: 4.5,
      numReviews: 22,
      description: 'classic game boy game',
    },
    {
      name: 'Pokemon Blue',
      sku: '000-000-222',
      category: 'Gameboy Games',
      image: '/assets/pokemon-blue.jpg',
      price: 19,
      countInStock: 12,
      brand: 'Nintendo',
      rating: 2.5,
      numReviews: 18,
      description: 'classic game boy game',
    },
    {
      name: 'Pokemon Yellow',
      sku: '000-000-333',
      category: 'Gameboy Games',
      image: '/assets/Pokemon_Yellow.png',
      price: 13,
      countInStock: 8,
      brand: 'Nintendo',
      rating: 1.5,
      numReviews: 16,
      description: 'classic game boy game',
    },
    {
      name: 'Pokemon Silver',
      sku: '000-000-444',
      category: 'Gameboy Games',
      image: '/assets/pokemon-silver.jpg',
      price: 19.5,
      countInStock: 0,
      brand: 'Nintendo',
      rating: 3.5,
      numReviews: 14,
      description: 'classic game boy game',
    },
  ],
};

export default data;
