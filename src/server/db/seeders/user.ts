import { User } from '../models/main.js'

export const adminId = 'd27936a6-9060-11ee-b9d1-0242ac120002'

const users = [
  {
    id: adminId,
    username: 'admin',
    isAdmin: true,
  },
]

const seedUsers = async () => {
  users.forEach(async (user) => {
    await User.upsert({ ...user })
  })
}

export default seedUsers
