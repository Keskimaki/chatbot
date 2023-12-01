import express from 'express'
import cors from 'cors'

import { inDevelopment } from '../../config.js'
import developmentMiddleware from '../middleware/development.js'
import chatRouter from './chat.js'

const router = express()

router.use(cors())
router.use(express.json())

if (inDevelopment) router.use(developmentMiddleware)

router.get('/ping', (_, res) => res.send('pong'))

router.use('/chats', chatRouter)

export default router
