import express from 'express'
import { startServer } from './server'

const port = 9100
const server = startServer({ app: express() })

server.listen(port, () => {
    console.log(`Running on port ${port}`)
})
