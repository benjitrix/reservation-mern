const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  lastname: {
    type: String,
    required: [true, 'please provide last name'],
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: 'admin'
  },
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin Reservations'
  }]
}, {timestamps: true})

// hash password
AdminSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

// compare password
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// create json web token
AdminSchema.methods.createJWT = function() {
  return jwt.sign(
    {userId: this.Id, lastname: this.lastname, firstname: this.firstname, role: this.role},
    `${process.env.JWT_SECRET}`,
    {expiresIn: `${process.env.JWT_LIFETIME}`}
  )
}

module.exports = mongoose.model('Admin', AdminSchema)