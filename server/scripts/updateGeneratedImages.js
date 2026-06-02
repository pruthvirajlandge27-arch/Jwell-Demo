const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });
const Jewellery = require('../models/Jewellery');
const Category = require('../models/Category');

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to assign generated images...');

    const items = await Jewellery.find({}).populate('category');
    let updated = 0;
    
    // We generated 3 images
    const imgChain = 'http://localhost:5000/uploads/maroon_gold_chain_1780142104855.png';
    const imgRing = 'http://localhost:5000/uploads/maroon_diamond_ring_1780142120559.png';
    const imgEarring = 'http://localhost:5000/uploads/maroon_earrings_1780142142304.png';

    for (let item of items) {
      const catSlug = item.category?.slug || '';
      const titleLower = item.title.toLowerCase();
      
      let selectedImage = imgEarring; // default
      
      if (catSlug.includes('chain') || catSlug.includes('mangalsutra') || titleLower.includes('chain') || titleLower.includes('mangalsutra')) {
        selectedImage = imgChain;
      } else if (catSlug.includes('ring') || catSlug.includes('band') || titleLower.includes('ring')) {
        selectedImage = imgRing;
      } else if (catSlug.includes('earring') || titleLower.includes('earring')) {
        selectedImage = imgEarring;
      } else {
        // Randomize the rest
        const options = [imgChain, imgRing, imgEarring];
        selectedImage = options[Math.floor(Math.random() * options.length)];
      }

      item.images = [
        {
          url: selectedImage,
          publicId: selectedImage.split('/').pop(),
          isPrimary: true
        }
      ];
      
      await item.save();
      updated++;
    }

    console.log(`Successfully assigned custom generated maroon background images to ${updated} items.`);
    process.exit(0);
  } catch (error) {
    console.error('Error assigning images:', error);
    process.exit(1);
  }
};

updateImages();
