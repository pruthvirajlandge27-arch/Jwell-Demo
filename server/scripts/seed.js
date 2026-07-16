const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

// Load models
const Admin = require('../models/Admin');
const Category = require('../models/Category');

const defaultCategories = [
  { name: "Men's Bali",       slug: "mens-bali",        icon: "💎", sortOrder: 1 },
  { name: "Men's Studs",      slug: "mens-studs",        icon: "✨", sortOrder: 2 },
  { name: "Kids Rings",       slug: "kids-rings",        icon: "👶", sortOrder: 3 },
  { name: "Gents Bracelets",  slug: "gents-bracelets",   icon: "⌚", sortOrder: 4 },
  { name: "Men's Chains",     slug: "mens-chains",       icon: "🔗", sortOrder: 5 },
  { name: "Ladies Chains",    slug: "ladies-chains",     icon: "📿", sortOrder: 6 },
  { name: "Couple Rings",     slug: "couple-rings",      icon: "💍", sortOrder: 7 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    // Seed Categories
    await Category.deleteMany();
    console.log('Categories cleared');
    await Category.insertMany(defaultCategories);
    console.log('Categories seeded');

    // Seed Admin
    await Admin.deleteMany();
    console.log('Admins cleared');
    
    const email = process.env.ADMIN_EMAIL || 'admin@kubdejewellers.com';
    const password = process.env.ADMIN_PASSWORD || 'KubdeAdmin@2024';
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await Admin.create({
      name: 'Super Admin',
      email: email,
      password: hashedPassword
    });
    console.log('Admin user seeded');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
