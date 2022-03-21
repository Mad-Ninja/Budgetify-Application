import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  _id: ObjectId,
  email: String,
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  gender: String,
  birth: String,
  country: String,

});

userSchema.statics.findByEmail = function (email) {
  return this.where({ email: new RegExp(email, 'i') }).exec();
};

export default mongoose.model('User', userSchema);