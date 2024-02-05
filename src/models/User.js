const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
