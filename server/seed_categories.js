require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    const categoriesToSeed = [
      { name: "Mens", slug: "mens", isActive: true },
      { name: "Womens", slug: "womens", isActive: true },
      { name: "Customized", slug: "customized", isActive: true },
      { name: "Silver", slug: "silver", isActive: true }
    ];

    for (const cat of categoriesToSeed) {
      const existing = await Category.findOne({ slug: cat.slug });
      if (!existing) {
        await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
