const Reservation = require('../models/Reservation.model')
const User = require('../models/User.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const { BadRequestError, UnauthenticatedError } = require('../errors')

// get all reservations
const getAllReservations = asyncWrapper(async (req, res, next) => {
  const reservations = await Reservation.find({})
  if (!reservations) {
    throw new BadRequestError('No reservations found')
  }

  res.status(200).json({message: {
    msgBody: 'All reservations retrieved', 
    msgError: false, 
    reservations
  }})
})

// get reservation
const getReservation = asyncWrapper(async (req, res, next) => {
  const reservation = await Reservation.findOne({registrantId: req.user.userId})
  if (!reservation) {
    throw new BadRequestError('Reservation not found')
  }

  res.status(200).json({message: {
    msgBody: `Reservation for -${reservation.position}, ${reservation.wing}- found`,
    msgError: false,
    position: reservation.position,
    wing: reservation.wing
  }})
})

// USER register reservation
const registerReservation = asyncWrapper(async (req, res, next) => {

  // add userId to req.body object
  req.body.registrantId = req.user.userId

   // check if user already registered
  const alreadyRegistered = await Reservation.findOne({registrantId: req.user.userId})
  if (alreadyRegistered) {
    throw new BadRequestError('User already registered. Only one registration per user allowed.')
  }

  // create registration
  const reservation = await Reservation.create(req.body)
  if (!reservation) {
    throw new BadRequestError('Reservation not successful')
  }

  // check if user exists
  const user = await User.findOne({_id: req.user.userId})
  if (!user) {
    throw new UnauthenticatedError('User not found')
  }

  await user.reservations.push(reservation)
  user.save()

  res.status(201).json({message: {
    msgBody: `Reservation for seat -${reservation.position}- made`, msgError: false, 
    isAuthenticated: true
  }}) 
})

// update reservation
const updateReservation = asyncWrapper(async (req, res, next) => {
  const id = req.params.id

  let reservationObj = {}
  const updateReservation = req.body
  for (const key in updateReservation) {
    reservationObj[key] = updateReservation[key]
  }

  const reservation = await Reservation.findOneAndUpdate({_id: id}, reservationObj, {new: true, runValidators: true})
  if (!reservation) {
    throw new BadRequestError('Reservation update not successful')
  }

  res.status(200).json({message: {
    msgBody: `New reservation is: -${reservation.seatNr}`,
    msgError: false,
    isAuthenticated: true,
    reservation: reservation.seatNr
  }})
})

// USER delete reservation
const deleteReservation = asyncWrapper(async (req, res, next) => {
  
  // check if reservation exists
  const reservationToDelete = await Reservation.findOne({registrantId: req.user.userId})
  if (!reservationToDelete) {
    throw new BadRequestError('Reservation to delete not found')
  }

  // delete reservation
  const reservation =  await Reservation.deleteOne({registrantId: req.user.userId})

  // remove deleted reservation references from user documents
  const user = await User.findOne({_id: req.user.userId})
  if (!user) {
    throw new BadRequestError('User not found')
  }

  const index = user.reservations.indexOf(reservationToDelete._id)
  user.reservations.splice(index, 1)
  user.save()

  res.status(200).json({message: {
    msgBody: `Reservation -${reservationToDelete.position}, ${reservationToDelete.wing}- deleted`, 
    msgError: false, 
    isAuthenticated: true
  }})
})

module.exports = { getAllReservations, getReservation,registerReservation, updateReservation, deleteReservation }