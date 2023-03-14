import express from 'express';
import http from 'http';
import createGame from './public/game.js';
import { Server } from 'socket.io';

const port=3000

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

game.addPlayer({playerId: 'player1',playerX:0,playerY:0})
game.addPlayer({playerId: 'player2',playerX:4,playerY:0})
game.addPlayer({playerId: 'player3',playerX:9,playerY:0})

game.addFruit({fruitId:'fruit1',fruitX:3,fruitY:3})
game.addFruit({fruitId:'fruit2',fruitX:3,fruitY:5})

game.movePlayer({playerId:'player1',keyPressed:'ArrowRight'})

console.log(game.state)

sockets.on('connection', (socket)=>{
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    sockets.emit('setup',game.state)

})

server.listen(port, ()=>{
    console.log(`> server listening on port: ${port}`)
})