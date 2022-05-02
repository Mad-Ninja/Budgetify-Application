import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  _id: String,
  name: String,
  amount: { type: Number, default: 0 },
  currency: {
    name: String,
    code: String,
    symbolNative: String,
  },
  description: String,
  userId: {
    type: String,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Account', accountSchema);