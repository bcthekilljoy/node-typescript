import express from 'express'
import { config } from 'dotenv'
import userRoute from './routes/user'
import locationRoute from './routes/location'
import cors from 'cors'

config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
const App = express()
App.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000/',
    optionsSuccessStatus: 200,
  })
)
App.use(express.json())
App.use(express.urlencoded({ extended: true }))

App.get('/', (_, res) => {
  res.status(200).send('<h1>WELCOME TO MANRIC</h1>')
})

App.use('/user', userRoute)
App.use('/location', locationRoute)

App.listen(process.env.PORT || 3000, () => {
  const port = process.env.PORT || 3000
  console.log('Server running at port ' + port)
})
