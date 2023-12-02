import { User } from '../models/index'

export const adminId = 'd27936a6-9060-11ee-b9d1-0242ac120002'

const users = [
  {
    id: adminId,
    username: 'admin',
    isAdmin: true,
  },
]

const seedUsers = async () => {
  for (const user of users) {
    await User.upsert({ ...user })
  }
}

export default seedUsers
