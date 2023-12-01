import express from 'express'
import cors from 'cors'

const router = express()

router.use(cors())
router.use(express.json())

router.get('/ping', (_, res) => res.send('pong'))

export default router
