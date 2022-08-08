const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  registrantId: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: [true, 'Please choose a seat number']
  }, 
  wing: {
    type: String,
    required: [true, 'Please provide seat wing']
  },
  reserved: {
    type: Boolean,
    required: [true, 'Please provide reservation status']
  },
  userReservation: {
    type: Boolean,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Reservation', ReservationSchema)