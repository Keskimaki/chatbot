import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'

import { inDevelopment, inStaging, inProduction } from '../config'
import { PORT } from './util/config'
import { connectToDatabase } from './db/connection'
import seed from './db/seeders/index'
import router from './routes/index'

const app = express()

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

if (inStaging || inProduction) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  await connectToDatabase()
  if (inDevelopment) await seed()

  console.log(`Server running on port ${PORT}`)
})
