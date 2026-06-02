const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });
const Jewellery = require('../models/Jewellery');

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to fix images...');

    const items = await Jewellery.find({});
    let updated = 0;
    
    for (let item of items) {
      if (item.images && item.images.length > 0) {
        let changed = false;
        item.images.forEach(img => {
          if (img.url && img.url.includes('unsplash.com')) {
            // Replace with a guaranteed working local image
            img.url = '/images/bridal_collection.png';
            changed = true;
          }
        });
        
        if (changed) {
          await item.save();
          updated++;
        }
      }
    }

    console.log(`Successfully fixed images for ${updated} items.`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing images:', error);
    process.exit(1);
  }
};

fixImages();
