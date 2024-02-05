const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  founded: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
