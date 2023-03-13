export default function createGame(){
    const state = {
        players: {},
        fruits:{},
        screen: {
            width:10,
            height:10
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x:playerX,
            y:playerY
        }
    }
    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX= command.fruitX
        const fruitY= command.fruitY

        state.fruits[fruitId]= {
            x:fruitX,
            y:fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){
        //console.log(`game.movePayer() -> Moving ${command.playerId} whith ${command.keyPressed}`)

        const aceptedMoves= {
            ArrowUp(player){
                //console.log(`game.movePayer().ArrowUp -> Moving player up`)
                if(player.y -1 >=0){
                    player.y = player.y-1
                    return
                }
            },
            ArrowDown(player){
                //console.log(`game.movePayer().ArrowUp -> Moving player down`)
                if(player.y +1 < state.screen.height){
                    player.y = player.y+1
                    return
                }
            },
            ArrowLeft(player){
                //console.log(`game.movePayer().ArrowUp -> Moving player left`)
                if(player.x -1 >=0){
                    player.x = player.x-1
                    return
                }
            },
            ArrowRight(player){
                //console.log(`game.movePayer().ArrowUp -> Moving player right`)
                if(player.x +1 < state.screen.width){
                    player.x = player.x+1
                    return
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = aceptedMoves[keyPressed]

        if(player && moveFunction){ 
            moveFunction(player) 
            checkForFruitCollision(playerId)
        }

    }

    function checkForFruitCollision(playerId){
                const player = state.players[playerId]

                for(const fruitId in state.fruits){
                    const fruit = state.fruits[fruitId]
                    console.log(`cheking ${playerId} and ${fruitId}`)

                    if(player.x === fruit.x && player.y===fruit.y){
                        console.log(`colision between ${playerId} and ${fruitId}`)

                        removeFruit({fruitId:fruitId})
                    }
                }     
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}