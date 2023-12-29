import express from 'express'
import cors from 'cors'

import { inDevelopment, inStaging } from '../../config'
import developmentMiddleware from '../middleware/development'
import accessLogger from '../middleware/access'
import userRouter from './user'
import modelRouter from './model'
import openaiRouter from './openai'
import chatRouter from './chat'

const router = express()

router.use(cors())
router.use(express.json())

if (inDevelopment || inStaging) router.use(developmentMiddleware)

router.use(accessLogger)

router.get('/ping', (_, res) => res.send('pong'))

router.use('/users', userRouter)
router.use('/models', modelRouter)
router.use('/openai', openaiRouter)
router.use('/chats', chatRouter)

export default router
