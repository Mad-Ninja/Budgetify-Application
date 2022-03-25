import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  _id: String,
  email: String,
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  gender: String,
  birth: String,
  country: String,
  accounts: [],
  categories: []

});

export default mongoose.model('User', userSchema);