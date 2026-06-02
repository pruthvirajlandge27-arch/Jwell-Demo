const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: __dirname + '/../.env' });
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding admin');

    const email = process.env.ADMIN_EMAIL || 'admin@bhamarejewellers.com';
    const password = process.env.ADMIN_PASSWORD || 'BhamareAdmin@2024';
    
    let admin = await Admin.findOne({ email });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await Admin.create({
        name: 'Super Admin',
        email: email,
        password: hashedPassword
      });
      console.log('Admin user seeded');
    } else {
      console.log('Admin already exists. Updating password just in case...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      admin.password = hashedPassword;
      await admin.save();
      console.log('Admin user updated');
    }

    console.log('Admin seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
