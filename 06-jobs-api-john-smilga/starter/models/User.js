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
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 6,
  },
})

//encrypt password before POST
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// define own custom instance methods and attach them to model, all instances have access to these methods

// createJWT  
UserSchema.methods.createJWT = function () {
  // 'this' is the document, i.e. the object we have created, 
  // or the user we are creating/awaiting in the controller:
  // const user = await User.create({ ...req.body })
  console.log("This: :-)", this)

  return jwt.sign({
    userId: this._id,
    name: this.name,
  },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TTL })
}

// compares entered pass with encrypted one from DB
UserSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(candidatePassword, this.password)
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
