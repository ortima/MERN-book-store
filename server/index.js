import express from 'express'

const app = express()
const PORT = 5000

app.get('/', (request, response) => {
  console.log(request)
  return response.status(200).send('Welcome to MERN Store')
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
