import express from 'express'

const PORT = 8000

const app = express()

app.get('/ping', (_, res) => res.send('pong'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
