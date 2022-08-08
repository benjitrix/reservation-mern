const express = require('express')
const router = express.Router()
const { getAllReservations,getReservation, registerReservation, updateReservation, deleteReservation } = require('../controllers/reservation')

// reservation routes
router.get('/all', getAllReservations)
router.get('/user', getReservation)
router.post('/register', registerReservation)
router.patch('/update/:id', updateReservation)
router.delete('/delete', deleteReservation)

module.exports = router