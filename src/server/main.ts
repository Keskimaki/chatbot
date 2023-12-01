import express from 'express'

import { PORT } from './util/config.js'
import router from './routes/main.js'

const app = express()

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
