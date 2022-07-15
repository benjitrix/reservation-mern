const notFound = (rrq, res, next) => {
  res.status(404).send('Route does not exist')
}

module.exports = notFound