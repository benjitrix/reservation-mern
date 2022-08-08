const Reservation = require('../models/Reservation.model')
const Admin = require('../models/Admin.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const { BadRequestError, UnauthenticatedError } = require('../errors')


// ADMIN register reservation
const adminRegisterReservation = asyncWrapper (async (req, res, next) => {
  // add userId to req.body object
  req.body.registrantId = req,user.userId

  // create reservation
  const reservation = await Reservation.create(req.body)
  if(!reservation) {
    throw new BadRequestError('Reservation not successful')
  }

  // check if admin exists
  const admin = await Admin.findOne({_id: req.user.userId})
  if (!admin) {
    throw new UnauthenticatedError('Admin not found')
  }

  await admin.reservations.push(reservation)
  admin.save()

  res.status(201).json({message: {
    msgBody: `Reservation for seat -${reservation.position}- made`,
    msgError: false,
    isAuthenticated: true
  }})
})

// ADMIN delete reservation
const adminDeleteReservation = asyncWrapper(async (req, res, next) => {
  // check if reservations exists
  const reservationToDelete = await Reservation.findOne({registrantId: req.user.userId})
  if (!reservationToDelete) {
    throw new BadRequestError('Reservation to delete not found')
  }

  // delete reservation
  const reservation = await Reservation.deleteOne({registrantId: req.user.userId})

  // remove deleted reservation references from admin documents
  const admin = await Admin.findOne({_id: req.user.userId})
  if (!admin) {
    throw new BadRequestError('Admin not found')
  }

  const index = admin.reservations.indexOf(reservationToDelete._id)
  admin.reservations.splice(index, 1)
  admin.save()

  res.status(200).json({message: {
    msgBody: `Reservation -${reservationToDelete.position}, ${reservationToDelete.wing}- deleted`,
    msgError: false,
    isAuthenticated: true
  }})
})

module.exports = { adminRegisterReservation, adminDeleteReservation }