const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log('AuthHeader: ', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No authorization to access this route')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = { userId: payload.userId, firstname: payload.firstname, lastname: payload.lastname, role: payload.role }
    // console.log('Req user (seat-reservation): ', req.user);
    next()
  } catch (error) {
    return new UnauthenticatedError('No authorization to access this route')
  }
}

module.exports = authenticateUser