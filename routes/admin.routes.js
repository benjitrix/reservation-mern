const express = require('express')
const router = express.Router()
const { adminRegisterReservation, adminDeleteReservation } = require('../controllers/admin')

// admin routes
router.post('/register', adminRegisterReservation)
router.delete('/delete', adminDeleteReservation)

module.exports = router