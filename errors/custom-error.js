class CustomAPIError extends Error {
  constructor(message, statusCode, errorStatus) {
    super(message)
    this.errorStatus = true
  }
}

const createCustomError = (msg, statusCode, errorStatus) => {
  return new CustomAPIError(msg, statusCode, errorStatus)
}

module.exports = { createCustomError, CustomAPIError }