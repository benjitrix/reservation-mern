const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./db/connect')
const userRouter = require('./routes/user.routes')
const reservationRouter = require('./routes/reservation.routes')
const adminRouter = require('./routes/admin.routes')
const authenticateUser = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

// JSON middleware
app.use(express.json())
app.use(cors())

// routes middleware
app.use('/api/v1/user', userRouter)
app.use('/api/v1/reservation', authenticateUser, reservationRouter)
app.use('/api/v1/reservations', reservationRouter)
app.use('/api/v1/admin', authenticateUser, adminRouter)

// api test routes
app.get('/', (req, res) => {
  res. send('Bye bye')
})
app.get('/greeting', (req, res) => {
  res.json({ greeting: 'hello' })
})

// route not-found, error handler middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

// start server, connect to DB
const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('Connected to DB: SEAT-RESERVATION...'))
    app.listen(port, () => {
      console.log(`SEAT-RESERVATION SERVER listening on port: ${port}`);
    })
  } catch (error) {
    console.log('Server unable to connect: ', error);
  }
}

start()