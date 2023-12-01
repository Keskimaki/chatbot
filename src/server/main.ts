import express from 'express'

import { PORT } from './util/config.js'
import { connectToDatabase } from './db/connection.js'
import router from './routes/main.js'

const app = express()

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.listen(PORT, async () => {
  await connectToDatabase()

  console.log(`Server running on port ${PORT}`)
})
