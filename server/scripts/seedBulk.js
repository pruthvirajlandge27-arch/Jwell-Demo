const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });
const Category = require('../models/Category');
const Jewellery = require('../models/Jewellery');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Bulk Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const collectionsData = [
  {
    category: { name: 'Bridal Sets', slug: 'bridal-sets', description: 'Complete traditional and modern bridal jewellery sets.', coverImage: '/images/bridal_collection.png' },
    items: [
      { title: 'Kundan Bridal Masterpiece', desc: 'Heavy kundan and polki bridal necklace set with matching earrings.', price: 250000, weight: '85g', tags: ['kundan', 'bridal', 'heavy'] },
      { title: 'Gold Antique Choker Set', desc: '22K gold antique finish choker with intricate temple design.', price: 180000, weight: '60g', tags: ['antique', 'choker'] },
      { title: 'Diamond Encrusted Bridal Set', desc: 'Sparkling diamond bridal set in 18K white gold.', price: 450000, weight: '45g', purity: '18K Gold', tags: ['diamond', 'bridal', 'modern'] }
    ]
  },
  {
    category: { name: 'Diamond Rings', slug: 'diamond-rings', description: 'Elegant and certified diamond rings for every occasion.', coverImage: '/images/diamond_collection.png' },
    items: [
      { title: 'Solitaire Engagement Ring', desc: 'Classic 1 carat solitaire ring in platinum.', price: 120000, weight: '4g', purity: '18K Gold', tags: ['solitaire', 'engagement'] },
      { title: 'Diamond Halo Ring', desc: 'Beautiful halo setting with sparkling side diamonds.', price: 85000, weight: '5g', purity: '18K Gold', tags: ['halo', 'party'] },
      { title: 'Rose Gold Diamond Band', desc: 'Minimalist rose gold band studded with diamonds.', price: 45000, weight: '3.5g', purity: '18K Gold', tags: ['band', 'daily wear'] }
    ]
  },
  {
    category: { name: 'Gold Chains', slug: 'gold-chains', description: 'Classic and modern 22K gold chains for daily wear.', coverImage: '/images/cat_chains.png' },
    items: [
      { title: 'Classic Rope Chain', desc: 'Durable and elegant 22K gold rope chain.', price: 55000, weight: '15g', tags: ['rope', 'daily wear'] },
      { title: 'Figaro Link Chain', desc: 'Stylish 22K gold figaro chain for men and women.', price: 75000, weight: '20g', tags: ['figaro', 'unisex'] },
      { title: 'Delicate Box Chain', desc: 'Thin and shiny box chain, perfect for pendants.', price: 25000, weight: '7g', tags: ['box', 'delicate'] },
      { title: 'Heavy Cuban Link Chain', desc: 'Statement Cuban link chain in 22K solid gold.', price: 185000, weight: '50g', tags: ['cuban', 'heavy'] }
    ]
  },
  {
    category: { name: 'Traditional Bangles', slug: 'traditional-bangles', description: 'Intricately designed 22K gold bangles and kadas.', coverImage: '/images/cat_bangles.png' },
    items: [
      { title: 'Temple Design Gold Kada', desc: 'Broad gold kada with detailed temple motifs.', price: 95000, weight: '28g', tags: ['kada', 'temple'] },
      { title: 'Meenakari Work Bangles (Set of 2)', desc: 'Beautiful colorful meenakari work on 22K gold.', price: 85000, weight: '24g', tags: ['meenakari', 'colorful'] },
      { title: 'Simple Daily Wear Bangles (Set of 4)', desc: 'Lightweight gold bangles for everyday use.', price: 110000, weight: '30g', tags: ['daily wear', 'simple'] }
    ]
  },
  {
    category: { name: 'Mangalsutras', slug: 'mangalsutras', description: 'Sacred threads of love, blending tradition with modern design.', coverImage: '/images/cat_mangalsutra.png' },
    items: [
      { title: 'Short Diamond Mangalsutra', desc: 'Modern short length mangalsutra with diamond pendant.', price: 65000, weight: '12g', purity: '18K Gold', tags: ['modern', 'diamond', 'short'] },
      { title: 'Traditional Long Gold Mangalsutra', desc: '22K gold traditional long mangalsutra with wati pendant.', price: 95000, weight: '25g', tags: ['traditional', 'long', 'wati'] },
      { title: 'Gemstone Encrusted Mangalsutra', desc: 'Elegant mangalsutra featuring ruby and emerald stones.', price: 78000, weight: '18g', tags: ['gemstone', 'party wear'] }
    ]
  }
];

const seedBulk = async () => {
  await connectDB();

  try {
    for (const data of collectionsData) {
      // Upsert Category
      let category = await Category.findOne({ slug: data.category.slug });
      if (!category) {
        console.log(`Creating category: ${data.category.name}`);
        category = new Category(data.category);
        await category.save();
      } else {
        console.log(`Category exists: ${data.category.name}`);
      }

      // Add Items
      for (const item of data.items) {
        const itemExists = await Jewellery.findOne({ title: item.title });
        if (!itemExists) {
          console.log(`  -> Adding item: ${item.title}`);
          const newJewellery = new Jewellery({
            title: item.title,
            description: item.desc,
            category: category._id,
            images: [
              {
                // Assigning a generic image placeholder
                url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600',
                publicId: `sample_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                isPrimary: true
              }
            ],
            weight: item.weight,
            purity: item.purity || '22K Gold',
            price: item.price,
            tags: item.tags,
            isActive: true,
            isFeatured: Math.random() > 0.5 // Randomly feature some items
          });
          await newJewellery.save();
        } else {
          console.log(`  -> Item exists: ${item.title}`);
        }
      }
    }

    console.log('Bulk seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during bulk seeding:', error);
    process.exit(1);
  }
};

seedBulk();
