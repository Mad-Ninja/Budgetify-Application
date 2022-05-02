import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  _id: String,
  type: String,
  amount: Number,
  category: [String],
  title: String,
  dateOfPayment: String,
  payee: String,
  description: String,
  currency: String,
  accountId: {
    type: String,
    ref: 'Account',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Transaction', transactionSchema);