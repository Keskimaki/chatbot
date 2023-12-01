import express from 'express'
import cors from 'cors'

import chatRouter from './chat.js'

const router = express()

router.use(cors())
router.use(express.json())

router.get('/ping', (_, res) => res.send('pong'))

router.use('/chats', chatRouter)

export default router
