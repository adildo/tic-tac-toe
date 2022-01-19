const player = (name, symbol) => {
    return {name, symbol};
};

const gameBoard = (() => {

    const board = document.getElementById('board')
    let array = ["", "", "", "", "", "", "", "", ""]
    
    const reset = () => {
        while(board.firstChild) {
            board.removeChild(board.lastChild)
        }
        array = ["", "", "", "", "", "", "", "", ""]
    }

    const createNewBoard = () => array.forEach((item, index) => {
        const square = document.createElement('div');
        square.textContent = item
        square.setAttribute("squareIndex", index)
        dispCont.declareTurn(dispCont.currentPlayer.name)
        square.addEventListener('click', () => {
            square.textContent = dispCont.currentPlayer.symbol;
            array[square.getAttribute('squareIndex')] = dispCont.currentPlayer.symbol
            dispCont.noWinner(array)
            dispCont.isWinner(dispCont.currentPlayer, array)
            dispCont.currentPlayer === dispCont.player1 ? dispCont.currentPlayer = dispCont.player2 : dispCont.currentPlayer = dispCont.player1;
            dispCont.declareTurn(dispCont.currentPlayer.name)
        }, {once:true})
        square.classList.add('square');
        board.append(square)
    })

    return {createNewBoard, reset}
})();

const dispCont = (() => {
    const gameInfo = document.querySelector('#gameInfo')
    const body = document.querySelector('body')

    const player1 = player('player 1', 'X')
    const player2 = player('player 2', 'O')
    let currentPlayer = player1

    const winningOptions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ]

    const removeResult = () => {
        if (document.getElementById('result')) {
            document.getElementById('result').remove()
        }
    } 
    const declareWinner = (playerName) => {
        removeResult()
        const result = document.createElement('div')
        result.id = 'result'
        result.textContent = playerName + ' Wins!'
        gameInfo.append(result)
    }

    const declareDraw = () => {
        removeResult()
        const result = document.createElement('div')
        result.id = 'result'
        result.textContent = 'It\'s a Draw'
        gameInfo.append(result)
    }

    const isWinner = (player, array) => {
        for (let i = 0; i < winningOptions.length; i++) {
            option = winningOptions[i]
            if (array[option[0]] === player.symbol && array[option[1]] === player.symbol && array[option[2]] === player.symbol) {
                declareWinner(player.name)
                document.querySelectorAll('.square').forEach(item => item.style.pointerEvents = "none")
                return true
            }
        }return false
    }
    
    const noWinner = (array) => {
        sum = 0
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== ""){
                sum ++
            }
        } if (sum === 9) {
            declareDraw()
            return true
        }
    }

    const playerTurn = document.createElement('div')
    playerTurn.id = 'playerTurn'
    const declareTurn = (player) => {
         playerTurn.textContent = 'This is ' + player + '\'s turn'
    }
    gameInfo.append(playerTurn)
 
    const restart = document.createElement('button')
    restart.textContent = "Restart"
    restart.addEventListener('click', () => {
        gameBoard.reset()
        gameBoard.createNewBoard()
        removeResult()
    })

    body.append(restart)

    return {player1, player2, currentPlayer, declareTurn, isWinner, noWinner, declareDraw}
    
})();
gameBoard.createNewBoard()