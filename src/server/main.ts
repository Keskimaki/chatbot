import express from 'express'

import { inDevelopment } from '../config.js'
import { PORT } from './util/config.js'
import { connectToDatabase } from './db/connection.js'
import seed from './db/seeders/main.js'
import router from './routes/main.js'

const app = express()

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.listen(PORT, async () => {
  await connectToDatabase()
  if (inDevelopment) await seed()

  console.log(`Server running on port ${PORT}`)
})
