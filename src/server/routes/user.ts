import express from 'express'

const userRouter = express.Router()

userRouter.get('/me', (req, res) => {
  const { user } = req

  res.send(user)
})

export default userRouter
