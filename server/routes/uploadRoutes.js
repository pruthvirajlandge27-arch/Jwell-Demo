const express = require('express');
const router = express.Router();
const { uploadImage, uploadImages, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/images', protect, upload.array('images', 6), uploadImages);
router.delete('/image/:id', protect, deleteImage);

module.exports = router;
