const mongoose = require('mongoose');

const JewellerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String },
    isPrimary: { type: Boolean, default: false }
  }],
  weight: { type: String },
  grossWeight: { type: String },
  netWeight: { type: String },
  productCode: { type: String },
  purity: { type: String },
  price: { type: Number },
  tags: [String],
  subcategory: { type: String },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jewellery', JewellerySchema);
