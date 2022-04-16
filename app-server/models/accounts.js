import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  _id: String,
  name: String,
  amount: Number,
  currency: String,
  description: String,
  userId: {
    type: String,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Account', accountSchema);