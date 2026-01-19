const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const User = require('./models/User');

dotenv.config();

const users = [
    { name: "Admin User", email: "admin@grubhub.com", password: "password123", role: "admin" },
    { name: "Jane Doe", email: "jane@example.com", password: "password123", role: "user" }
];

const services = [
  {
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    rating: 4.5,
    time: "25-35 min",
    deliveryFee: "Free",
    tags: ["Burgers", "American", "Fast Food"],
    menu: [
        { name: "Whopper", price: 5.99, description: "Flame-grilled beef patty", category: "Burgers" },
        { name: "Chicken Royale", price: 6.49, description: "Crispy chicken breast", category: "Burgers" },
        { name: "Fries", price: 2.99, description: "Classic salted fries", category: "Sides" }
    ]
  },
  {
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.8,
    time: "40-50 min",
    deliveryFee: "$2.99",
    tags: ["Sushi", "Japanese", "Seafood"],
    menu: [
        { name: "Salmon Sashimi", price: 12.99, description: "Fresh salmon slices", category: "Sushi" },
        { name: "California Roll", price: 8.99, description: "Crab, avocado, cucumber", category: "Rolls" }
    ]
  },
  {
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    rating: 4.2,
    time: "30-40 min",
    deliveryFee: "$1.49",
    tags: ["Pizza", "Italian", "Fast Food"],
    menu: [
        { name: "Pepperoni Feast", price: 14.99, description: "Double pepperoni", category: "Pizza" },
        { name: "Veggie Supreme", price: 13.99, description: "Mushrooms, peppers, onions", category: "Pizza" }
    ]
  },
  {
      name: "Indian Spice",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=800&q=80",
      rating: 4.7,
      time: "35-45 min",
      deliveryFee: "$3.99",
      tags: ["Indian", "Curry", "Spicy"],
      menu: [
          { name: "Butter Chicken", price: 15.99, description: "Creamy tomato curry", category: "Curry" },
          { name: "Naan", price: 2.99, description: "Oven-baked flatbread", category: "Bread" }
      ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/grubhub');
    console.log('✅ Connected to MongoDB');

    try {
        await Service.deleteMany({});
        console.log('🗑️  Cleared Services');
        await Service.insertMany(services);
        console.log('🌱 Services Seeded');
    } catch (e) {
        console.error('❌ Service Seed Error:', e.message);
    }

    try {
        await User.deleteMany({});
        console.log('🗑️  Cleared Users');
        // Loop to create users one by one to see specific failure
        for (const user of users) {
            await User.create(user);
        }
        console.log('🌱 Users Seeded');
    } catch (e) {
        console.error('❌ User Seed Error:', e.message);
    }

    console.log('✨ Seeding Completed');
    process.exit();
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
    process.exit(1);
  }
};

seedDB();
