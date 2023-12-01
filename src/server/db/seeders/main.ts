import seedUsers from './user.js'
import seedChats from './chat.js'

const seed = async () => {
  await seedUsers()
  await seedChats()
}

export default seed
