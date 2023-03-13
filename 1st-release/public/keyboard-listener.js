export default function createKeyboardLiestener(document){
    
    const state = {
        observers: []
    }
    
    function subscribe(observerFuction){
        state.observers.push(observerFuction)
    }

    function notifyAll(command){
        //console.log(`keyboardListener -> Notifying ${state.observers.length} observers`)

        for(const observerFuction of state.observers){
            observerFuction(command)
        }
    }

    document.addEventListener('keydown',handleKeydown)

    function handleKeydown(event){
        const keyPressed = event.key
    
        const command = {
            playerId: 'player1',
            keyPressed
        }

    notifyAll(command)
    }
    
    return{
        subscribe
    }
}