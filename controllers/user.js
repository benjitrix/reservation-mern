const User = require('../models/User.model')
const Admin = require('../models/Admin.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError, CustomAPIError } = require('../errors/custom-error')

// user controllers
const registerUser = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body)
  if (!user) {
    throw new BadRequestError('User not created')
  }

  res.status(201).json({message: {
    msgBody: `User -${user.lastname}, ${user.firstname}- created` , 
    msgError: false
  }})
})

// login
const loginUser = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body
  const user = await User.findOne({email})
  const admin = await Admin.findOne({email})

  // check for user in DB
  if (!user && !admin) {
    return next(createCustomError(`User with email: ${email} not found`, 404, true))
  }

  let token

  if (user) {
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
    throw new BadRequestError('Password incorrect')
  }

    // create token for session, authentication
    token = user.createJWT()
  }

  if (admin) {
    // compare password
    const isPasswordCorrect = await admin.comparePassword(password)
    if (!isPasswordCorrect) {
    throw new BadRequestError('Password incorrect')
  }

    // create token for session, authentication
    token = admin.createJWT()
  }
  

  res.status(200).json({message: {
    msgBody: `User -${email}- logged in`, 
    msgError: false, 
    isAuthenticated: true,
    name: [user.firstname, user.lastname],
    token
  }})
})

const updateUser = asyncWrapper(async (req, res, next) => {

})

const deleteUser = asyncWrapper( async(req, res, next) => {

})


const authenticate = asyncWrapper(async (req, res, next) => {
  const { userId, firstname, lastname, role } = req.user
  console.log('Authenticate seat reservation: ', req.user);

  res.status(200).json({message: {
    msgBody: {firstname, lastname, role},
    msgError: false,
    isAuthenticated: true
  }})
})

module.exports = { registerUser, loginUser, updateUser, deleteUser, authenticate }