const asyncHandler = require('express-async-handler');
const Jewellery = require('../models/Jewellery');
const Category = require('../models/Category');
const { cloudinary } = require('../middleware/uploadMiddleware');

const getJewellery = asyncHandler(async (req, res) => {
  const { category, featured, all } = req.query;
  let query = {};

  if (all !== 'true') {
    query.isActive = true;
  }

  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      query.category = cat._id;
    } else {
      return res.json([]);
    }
  }

  if (featured === 'true') {
    query.isFeatured = true;
  }

  const jewellery = await Jewellery.find(query)
    .populate('category', 'name slug')
    .sort({ createdAt: -1 });

  res.json(jewellery);
});

const getJewelleryById = asyncHandler(async (req, res) => {
  const jewellery = await Jewellery.findById(req.params.id).populate('category', 'name slug');
  if (jewellery) {
    res.json(jewellery);
  } else {
    res.status(404);
    throw new Error('Jewellery not found');
  }
});

const createJewellery = asyncHandler(async (req, res) => {
  const jewellery = await Jewellery.create(req.body);
  res.status(201).json(jewellery);
});

const updateJewellery = asyncHandler(async (req, res) => {
  const jewellery = await Jewellery.findById(req.params.id);
  if (jewellery) {
    Object.assign(jewellery, req.body);
    jewellery.updatedAt = Date.now();
    const updatedJewellery = await jewellery.save();
    res.json(updatedJewellery);
  } else {
    res.status(404);
    throw new Error('Jewellery not found');
  }
});

const deleteJewellery = asyncHandler(async (req, res) => {
  const jewellery = await Jewellery.findById(req.params.id);
  if (jewellery) {
    // Delete associated images from Cloudinary
    if (jewellery.images && jewellery.images.length > 0) {
      for (const img of jewellery.images) {
        if (img.publicId) {
          try {
            await cloudinary.uploader.destroy(img.publicId);
          } catch (err) {
            console.error(`Failed to delete image ${img.publicId} from Cloudinary:`, err.message);
          }
        }
      }
    }
    await jewellery.deleteOne();
    res.json({ message: 'Jewellery removed' });
  } else {
    res.status(404);
    throw new Error('Jewellery not found');
  }
});

module.exports = { getJewellery, getJewelleryById, createJewellery, updateJewellery, deleteJewellery };
