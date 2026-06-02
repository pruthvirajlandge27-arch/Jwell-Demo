const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../middleware/uploadMiddleware');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image uploaded');
  }
  res.json({
    url: req.file.path,
    publicId: req.file.filename
  });
});

const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No images uploaded');
  }
  
  const uploadedFiles = req.files.map(file => ({
    url: file.path,
    publicId: file.filename
  }));
  
  res.json(uploadedFiles);
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params; // this is the public_id
  if (!id) {
    res.status(400);
    throw new Error('No image id provided');
  }

  try {
    const result = await cloudinary.uploader.destroy(id);
    res.json({ message: 'Image deleted from cloudinary', result });
  } catch (error) {
    res.status(500);
    throw new Error('Could not delete image');
  }
});

module.exports = { uploadImage, uploadImages, deleteImage };
