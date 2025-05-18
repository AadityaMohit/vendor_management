const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bankAccountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  zip: String,
}, { timestamps: true });

vendorSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Vendor', vendorSchema);
