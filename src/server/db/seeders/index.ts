import seedUsers from './user'
import seedChats from './chat'

const seed = async () => {
  await seedUsers()
  await seedChats()
}

export default seed
