const mongoose = require('mongoose');
// import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

// userSchema.methods.generateToken = () => {
//   const { JWT_SECRET, JWT_EXPIRE } = process.env;

//   const payload = {
//     id: this._id,
//   };

//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
