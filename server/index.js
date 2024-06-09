import express, { request } from 'express'
import bookRoutes from './routes/bookRoutes.js'

import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5500

app.use('/', bookRoutes)

app.get('/', (request, response) => {
  console.log(request)
  return response.status(200).send('Welcome to MERN Store')
})

const startServer = async () => {
  console.log('Starting server...')
  console.log('Connecting to database...')
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Success connect to database')

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
  } catch (error) {
    console.error('Error connecting to the database', error)
  }
}

startServer()
