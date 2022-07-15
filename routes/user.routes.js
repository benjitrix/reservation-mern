const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser, deleteUser, authenticate } = require('../controllers/user')
const authenticateUser = require('../middleware/auth')

// user routes
router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.put('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUser)
router.get('/check/authorize', authenticateUser, authenticate)

module.exports = router