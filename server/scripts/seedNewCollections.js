const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Category = require('../models/Category');
const Jewellery = require('../models/Jewellery');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding New Collections...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

const collectionsData = [
  {
    category: {
      name: "Men Collection",
      slug: "mens",
      description: "Bold rings, chains, and bracelets for modern styling.",
      coverImage: "/images/cat_chains.png",
      sortOrder: 1,
      subcategories: [
        { name: "Chains", slug: "chains" },
        { name: "Rings", slug: "rings" },
        { name: "Bracelets", slug: "bracelets" },
        { name: "Kada", slug: "kada" }
      ]
    },
    items: [
      {
        title: "22K Yellow Gold Cuban Link Chain",
        description: "A premium solid gold Cuban link chain for men, perfect for daily styling and celebratory wear.",
        weight: "45.2g",
        grossWeight: "45.2g",
        netWeight: "42.0g",
        productCode: "#Tpc/m101",
        purity: "22K Gold",
        price: 310000,
        subcategory: "chains",
        tags: ["chain", "cuban", "men"],
        isFeatured: true,
        image: "/images/cat_chains.png"
      },
      {
        title: "Classic Gold Rope Chain",
        description: "Elegant and highly durable rope link chain made with 22K yellow gold.",
        weight: "18.5g",
        grossWeight: "18.5g",
        netWeight: "17.0g",
        productCode: "#Tpc/m102",
        purity: "22K Gold",
        price: 125000,
        subcategory: "chains",
        tags: ["chain", "rope", "dailywear"],
        isFeatured: false,
        image: "/images/cat_chains.png"
      },
      {
        title: "Sleek Diamond Cut Men's Ring",
        description: "Featuring sharp diamond-cut patterns on a thick band of 22K pure gold.",
        weight: "8.4g",
        grossWeight: "8.4g",
        netWeight: "7.8g",
        productCode: "#Tpc/m103",
        purity: "22K Gold",
        price: 58000,
        subcategory: "rings",
        tags: ["ring", "men", "diamond-cut"],
        isFeatured: true,
        image: "/images/cat_rings.png"
      },
      {
        title: "Intricate Filigree Men's Bracelet",
        description: "Stunning gold chain-link bracelet with intricate filigree details along the clasp.",
        weight: "22.1g",
        grossWeight: "22.1g",
        netWeight: "20.5g",
        productCode: "#Tpc/m104",
        purity: "22K Gold",
        price: 152000,
        subcategory: "bracelets",
        tags: ["bracelet", "men", "filigree"],
        isFeatured: false,
        image: "/images/cat_bracelets.png"
      },
      {
        title: "Royal Maharaja Gold Kada",
        description: "A thick, traditional Punjabi styled gold Kada with standard high-polish finish.",
        weight: "35.8g",
        grossWeight: "35.8g",
        netWeight: "33.5g",
        productCode: "#Tpc/m105",
        purity: "22K Gold",
        price: 245000,
        subcategory: "kada",
        tags: ["kada", "royal", "men"],
        isFeatured: true,
        image: "/images/cat_bangles.png"
      }
    ]
  },
  {
    category: {
      name: "Women Collection",
      slug: "womens",
      description: "Elegant designs crafted for celebrations and daily wear.",
      coverImage: "/images/bridal_collection.png",
      sortOrder: 2,
      subcategories: [
        { name: "Bridal", slug: "bridal" },
        { name: "Bangles", slug: "bangles" },
        { name: "Rings", slug: "rings" },
        { name: "Earrings", slug: "earrings" },
        { name: "Pendants", slug: "pendants" },
        { name: "Mangalsutra", slug: "mangalsutra" }
      ]
    },
    items: [
      {
        title: "Antique Royal Kundan Bridal Set",
        description: "Exquisite traditional Kundan choker set encrusted with real gemstones and pearls.",
        weight: "115.0g",
        grossWeight: "115.0g",
        netWeight: "105.0g",
        productCode: "#Tpc/w201",
        purity: "916 Hallmark",
        price: 780000,
        subcategory: "bridal",
        tags: ["bridal", "kundan", "heavy", "set"],
        isFeatured: true,
        image: "/images/bridal_collection.png"
      },
      {
        title: "Traditional Gold Jhumka Earrings",
        description: "Timeless antique drop-style Jhumka earrings adorned with micro pearls.",
        weight: "16.4g",
        grossWeight: "16.4g",
        netWeight: "15.0g",
        productCode: "#Tpc/w202",
        purity: "22K Gold",
        price: 112000,
        subcategory: "earrings",
        tags: ["earrings", "jhumka", "traditional"],
        isFeatured: true,
        image: "/images/cat_earrings.png"
      },
      {
        title: "Flora Diamond-Encrusted Ring",
        description: "Delicate ring set in 18K rose gold, featuring a central floral diamond motif.",
        weight: "4.8g",
        grossWeight: "4.8g",
        netWeight: "4.2g",
        productCode: "#Tpc/w203",
        purity: "18K Gold",
        price: 89000,
        subcategory: "rings",
        tags: ["rings", "diamond", "rose-gold"],
        isFeatured: false,
        image: "/images/featured_rings.png"
      },
      {
        title: "Classic Gold Bridal Bangles (Set of 4)",
        description: "Set of four matching 22K yellow gold bangles with intricate relief work.",
        weight: "48.0g",
        grossWeight: "48.0g",
        netWeight: "44.5g",
        productCode: "#Tpc/w204",
        purity: "22K Gold",
        price: 330000,
        subcategory: "bangles",
        tags: ["bangles", "gold", "set"],
        isFeatured: false,
        image: "/images/gold_bangles.png"
      },
      {
        title: "Short Dailywear Gold Mangalsutra",
        description: "Modern minimalist short mangalsutra with black beads and a floral pendant.",
        weight: "9.2g",
        grossWeight: "9.2g",
        netWeight: "8.5g",
        productCode: "#Tpc/w205",
        purity: "22K Gold",
        price: 63000,
        subcategory: "mangalsutra",
        tags: ["mangalsutra", "short", "dailywear"],
        isFeatured: true,
        image: "/images/cat_mangalsutra.png"
      },
      {
        title: "Luminous Heart Pendant",
        description: "Stunning gold pendant designed in a love heart outline with diamond cut finishes.",
        weight: "3.5g",
        grossWeight: "3.5g",
        netWeight: "3.2g",
        productCode: "#Tpc/w206",
        purity: "22K Gold",
        price: 24000,
        subcategory: "pendants",
        tags: ["pendant", "minimalist", "heart"],
        isFeatured: false,
        image: "/images/cat_pendants.png"
      }
    ]
  },
  {
    category: {
      name: "Customied Collection",
      slug: "customized",
      description: "Personalized pieces designed around your story.",
      coverImage: "/images/diamond_collection.png",
      sortOrder: 3,
      subcategories: [
        { name: "Rings", slug: "rings" },
        { name: "Bands", slug: "bands" },
        { name: "Necklaces", slug: "necklaces" },
        { name: "Diamonds", slug: "diamonds" }
      ]
    },
    items: [
      {
        title: "Signature Nameplate Necklace",
        description: "Custom handwritten name necklace crafted in 18K solid yellow gold.",
        weight: "6.5g",
        grossWeight: "6.5g",
        netWeight: "5.9g",
        productCode: "#Tpc/c301",
        purity: "18K Gold",
        price: 49000,
        subcategory: "necklaces",
        tags: ["custom", "necklace", "nameplate"],
        isFeatured: true,
        image: "/images/diamond_collection.png"
      },
      {
        title: "Solitaire Promise Ring",
        description: "Certified premium 1.5 carat round brilliant cut diamond ring on a platinum band.",
        weight: "5.2g",
        grossWeight: "5.2g",
        netWeight: "4.8g",
        productCode: "#Tpc/c302",
        purity: "18K Gold",
        price: 260000,
        subcategory: "rings",
        tags: ["promise-ring", "solitaire", "diamond"],
        isFeatured: true,
        image: "/images/featured_rings.png"
      },
      {
        title: "Customized Diamond Couple Bands",
        description: "Matching customized diamond bands in 18K white gold with personalized inner engraving.",
        weight: "11.0g",
        grossWeight: "11.0g",
        netWeight: "10.0g",
        productCode: "#Tpc/c303",
        purity: "18K Gold",
        price: 135000,
        subcategory: "bands",
        tags: ["bands", "couple", "engraved"],
        isFeatured: false,
        image: "/images/featured_rings.png"
      },
      {
        title: "Premium Eternity Diamond Tennis Bracelet",
        description: "Bespoke diamond tennis bracelet featuring a continuous line of brilliant round cut diamonds.",
        weight: "14.5g",
        grossWeight: "14.5g",
        netWeight: "13.2g",
        productCode: "#Tpc/c304",
        purity: "18K Gold",
        price: 450000,
        subcategory: "diamonds",
        tags: ["tennis-bracelet", "diamond", "premium"],
        isFeatured: true,
        image: "/images/diamond_collection.png"
      }
    ]
  },
  {
    category: {
      name: "Silver Collection",
      slug: "silver",
      description: "Contemporary silver items with classic craftsmanship.",
      coverImage: "/images/cat_earrings.png",
      sortOrder: 4,
      subcategories: [
        { name: "Rings", slug: "rings" },
        { name: "Earrings", slug: "earrings" },
        { name: "Anklets", slug: "anklets" },
        { name: "Bracelets", slug: "bracelets" }
      ]
    },
    items: [
      {
        title: "Handcrafted Silver Filigree Ring",
        description: "Exquisite 925 sterling silver ring featuring traditional Rajasthani wirework.",
        weight: "7.2g",
        grossWeight: "7.2g",
        netWeight: "6.8g",
        productCode: "#Tpc/s401",
        purity: "925 Silver",
        price: 3200,
        subcategory: "rings",
        tags: ["ring", "silver", "filigree"],
        isFeatured: true,
        image: "/images/cat_rings.png"
      },
      {
        title: "925 Sterling Silver Hoop Earrings",
        description: "Classic high-polish silver hoop earrings, lightweight and suitable for daily wear.",
        weight: "5.4g",
        grossWeight: "5.4g",
        netWeight: "5.0g",
        productCode: "#Tpc/s402",
        purity: "925 Silver",
        price: 1800,
        subcategory: "earrings",
        tags: ["earrings", "hoops", "silver"],
        isFeatured: false,
        image: "/images/cat_earrings.png"
      },
      {
        title: "Traditional Silver Ghungroo Anklets",
        description: "Stunning sterling silver payal (anklets) decorated with tiny chime bells (ghungroo).",
        weight: "24.5g",
        grossWeight: "24.5g",
        netWeight: "22.0g",
        productCode: "#Tpc/s403",
        purity: "925 Silver",
        price: 6500,
        subcategory: "anklets",
        tags: ["anklet", "silver", "traditional"],
        isFeatured: true,
        image: "/images/cat_earrings.png"
      },
      {
        title: "Minimalist Oxidized Silver Bracelet",
        description: "Trendy oxidized sterling silver cuff bracelet with tribal design elements.",
        weight: "12.8g",
        grossWeight: "12.8g",
        netWeight: "11.5g",
        productCode: "#Tpc/s404",
        purity: "925 Silver",
        price: 4500,
        subcategory: "bracelets",
        tags: ["bracelet", "oxidized", "silver"],
        isFeatured: false,
        image: "/images/cat_bracelets.png"
      }
    ]
  }
];

const seedNewCollections = async () => {
  await connectDB();

  try {
    // Clear old data to prevent taxonomy overlap or duplicates
    console.log('Clearing old categories and products...');
    await Category.deleteMany({});
    await Jewellery.deleteMany({});
    console.log('Old collections cleared.');

    for (const data of collectionsData) {
      console.log(`Seeding category: ${data.category.name}`);
      const category = new Category(data.category);
      await category.save();

      for (const item of data.items) {
        console.log(`  -> Seeding jewellery: ${item.title}`);
        const jewellery = new Jewellery({
          title: item.title,
          description: item.description,
          category: category._id,
          images: [
            {
              url: item.image,
              isPrimary: true
            }
          ],
          weight: item.weight,
          grossWeight: item.grossWeight,
          netWeight: item.netWeight,
          productCode: item.productCode,
          purity: item.purity,
          price: item.price,
          subcategory: item.subcategory,
          tags: item.tags,
          isActive: true,
          isFeatured: item.isFeatured
        });
        await jewellery.save();
      }
    }

    console.log('Seeding of new collections and subcategories completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedNewCollections();
