import express from 'express'
import cors from 'cors'

import { inDevelopment } from '../../config'
import developmentMiddleware from '../middleware/development'
import openaiRouter from './openai'
import chatRouter from './chat'

const router = express()

router.use(cors())
router.use(express.json())

if (inDevelopment) router.use(developmentMiddleware)

router.get('/ping', (_, res) => res.send('pong'))

router.use('/openai', openaiRouter)
router.use('/chats', chatRouter)

export default router
