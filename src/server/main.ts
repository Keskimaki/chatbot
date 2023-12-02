import express from 'express'

import { inDevelopment } from '../config'
import { PORT } from './util/config'
import { connectToDatabase } from './db/connection'
import seed from './db/seeders/index'
import router from './routes/index'

const app = express()

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.listen(PORT, async () => {
  await connectToDatabase()
  if (inDevelopment) await seed()

  console.log(`Server running on port ${PORT}`)
})
