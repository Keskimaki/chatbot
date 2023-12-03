import logger from '../../util/logger'

import seedUsers from './user'
import seedChats from './chat'

const seed = async () => {
  await seedUsers()
  await seedChats()

  logger.info('Seeding complete')
}

export default seed
