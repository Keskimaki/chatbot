import express from 'express'

const openaiRouter = express()

openaiRouter.post('/openai', (req, res) => {
  res.send('Hello, world!')
})

export default openaiRouter
