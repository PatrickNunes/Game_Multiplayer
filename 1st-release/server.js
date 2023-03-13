import express from 'express'
import http from 'http'

const port=3000

const app = express()
const server = http.createServer(app)

app.use(express.static('public'))

server.listen(port, ()=>{
    console.log(`> server listening on port: ${port}`)
})