const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    minlength: 2,
    maxlength: 44,
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email, please try again',
    ],
    unique: true,
  },
  password: {     // JUST AN EXERCISE, PASS NEEDS TO BE HASHED
    type: String,
    required: [true, 'Please enter password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({
    userId: this._id,
    name: this.name,
  },
    "noSecret",
    { expiresIn: '30d' })
}


module.exports = mongoose.model('User', UserSchema)
