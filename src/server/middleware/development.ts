import { Request, Response, NextFunction } from 'express'

import { adminId } from '../db/seeders/user.js'
import { User } from '../db/models/index.js'

const getDevUser = async () => {
  const devUser = await User.findByPk(adminId, {
    attributes: ['id', 'username', 'isAdmin'],
  })

  return devUser
}

// Simulate a logged in user in development.
const developmentMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const devUser = (await getDevUser()) as User

  const { id, username, isAdmin } = devUser
  req.user = { id, username, isAdmin }

  return next()
}

export default developmentMiddleware
