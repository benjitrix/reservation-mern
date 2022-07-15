const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({message: {
      msgBody: err.message, 
      msgError: err.errorStatus
    }})
  }

  return res.status(500).json({message: {
    msgBody: 'Something went wrong. Please try again.', 
    msgError: true,
    err
  }})
}

module.exports = errorHandlerMiddleware