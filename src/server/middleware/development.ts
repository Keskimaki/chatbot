import { adminId } from '../db/seeders/user.js'
import { User } from '../db/models/main.js'

const getDevUser = async () => {
  const devUser = await User.findByPk(adminId, {
    attributes: ['id', 'username', 'isAdmin'],
  })

  return devUser
}

// Simulate a logged in user in development.
const developmentMiddleware = async (req: any, _: any, next: any) => {
  const devUser = (await getDevUser()) as User

  const { id, username, isAdmin } = devUser
  req.user = { id, username, isAdmin }

  return next()
}

export default developmentMiddleware
