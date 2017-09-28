
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// TODO: add uniqueness and email verigication to E mail

const schema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true}
  }, { timestamp: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email
  }, process.env.JWT_SECRET)
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    emaiol: this.email,
    token: this.generateJWT()
  }
}

export default mongoose.model('User', schema);
