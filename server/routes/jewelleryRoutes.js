const express = require('express');
const router = express.Router();
const { getJewellery, getJewelleryById, createJewellery, updateJewellery, deleteJewellery } = require('../controllers/jewelleryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getJewellery);
router.get('/:id', getJewelleryById);
router.post('/', protect, createJewellery);
router.put('/:id', protect, updateJewellery);
router.delete('/:id', protect, deleteJewellery);

module.exports = router;
