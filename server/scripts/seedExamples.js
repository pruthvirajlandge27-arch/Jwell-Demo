require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Jewellery = require('../models/Jewellery');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwell', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    const categoriesToSeed = [
      { name: 'Silver Earrings', slug: 'silver-earrings', description: 'Beautiful silver earrings for daily wear.', coverImage: '/images/cat_earrings.png' },
      { name: 'Platinum Bands', slug: 'platinum-bands', description: 'Elegant platinum bands for couples.', coverImage: '/images/cat_rings.png' },
      { name: 'Ruby Pendants', slug: 'ruby-pendants', description: 'Stunning ruby pendants to highlight your neck.', coverImage: '/images/cat_pendants.png' }
    ];

    for (let catData of categoriesToSeed) {
      // Check if category exists
      let category = await Category.findOne({ slug: catData.slug });
      
      if (!category) {
        console.log(`Creating category: ${catData.name}`);
        category = new Category(catData);
        await category.save();
      } else {
        console.log(`Category already exists: ${catData.name}`);
      }

      // Add a sample jewellery design to this category
      const jwellCount = await Jewellery.countDocuments({ category: category._id });
      if (jwellCount === 0) {
        console.log(`Adding sample jewellery for ${catData.name}`);
        const sampleJewellery = new Jewellery({
          title: `Sample ${catData.name} Design`,
          description: `This is an exclusive sample design for ${catData.name}. Perfect for any occasion.`,
          category: category._id,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1599643477874-c4e97a3a8309?w=500&q=80',
              publicId: 'sample1',
              isPrimary: true
            }
          ],
          weight: '10g',
          purity: '22K Gold',
          price: 50000,
          tags: ['sample', catData.slug.replace('-', '')],
          isActive: true,
          isFeatured: true
        });
        await sampleJewellery.save();
      } else {
        console.log(`Jewellery already exists for ${catData.name}`);
      }
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
