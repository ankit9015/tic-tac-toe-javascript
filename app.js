var Gameboard = (function() {
    let gameboard = ["", '', '', '', '', '', '', '', ''];

    const setCell = (index, symbol) => {
        gameboard[index] = symbol;
    }

    const getCell = (index) => {
        return gameboard[index]
    }

    const includes = (symbol) => {
        return gameboard.includes(symbol);
    }

    const reset = () => {
        gameboard = ["", '', '', '', '', '', '', '', ''];
    }

    return {setCell, getCell, reset, includes};
})()

var Player = (nameInput, symbol) => {
    const name = nameInput;
    const sign = symbol;

    const getSign = () => {
        return sign;
    }

    const getName = () => {
        return name
    }

    return {getSign, getName};
}

var displayController = (function() {
    var elements = document.querySelectorAll(".gameboard-element");
    const player1Name = document.querySelector("#player1");
    const player2Name = document.querySelector("#player2");
    const buttonStart = document.querySelector("#start-game");
    const playerWrapper = document.querySelector("#player-wrapper");
    const resultPopup = document.querySelector("#result-popup");
    const buttonRestart = document.querySelector("#restart")
    
    elements.forEach(element => {
        element.addEventListener("click", ()=>{
            console.log("position", element.dataset.index);
            game.playRound(element.dataset.index);
        })

    });



    buttonStart.addEventListener('click', () => {
        if (player1Name.value && player2Name.value) {
            game.createPlayer(player1Name.value, player2Name.value);
            playerWrapper.style.display = "none";
        }
        
        // playerWrapper.style.backgroundColor = "orange";
    });

    buttonRestart.addEventListener('click', () => {
        resetCells();
        Gameboard.reset();
        resultPopup.style.display = 'none';
    })




    const fillCell = (fieldIndex, sign) => {
        elements[fieldIndex].innerText = sign;
    }

    const resetCells = () => {
        elements.forEach(element => {
            element.innerText = '';
        })
    }

    const showResult = (message) => {
        resultPopup.style.display = "flex";
        console.log(resultPopup.children[0]);
        resultPopup.children[0].innerText = message;
    }

    return {fillCell, resetCells, showResult}
})()

var game = (function() {
    let playerX;
    let playerO;

    const createPlayer = (player1Name, player2Name) => {
        playerX = Player(player1Name, 'X');
        playerO = Player(player2Name, 'O');
        console.log(playerX.getName());
    }

    
    
    let moveNum = 0;

    const winComposition = [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];
    
    const playRound = (fieldIndex) => {
        moveNum++;
        const currentPlayerSign = getCurrentPlayer().getSign();
        if (Gameboard.getCell(fieldIndex) === '') {
            Gameboard.setCell(fieldIndex, currentPlayerSign);
            displayController.fillCell(fieldIndex, currentPlayerSign);
            // console.log(Gameboard.gameboard);
        }
        if (moveNum > 4) {
            checkWin(currentPlayerSign);
        }
        
    }

    const getCurrentPlayer = () => {
        const currentPlayer = (moveNum % 2 === 0)? playerX: playerO;

        return currentPlayer
    }


    const checkWin = (symbol) => {
        let flag = false;

        winComposition.forEach(arr => {
            for (index of arr) {
                if (Gameboard.getCell(index) !== symbol){
                    return;
                }
            }
            console.log(`win ${getCurrentPlayer().getName()}`);
            
            displayController.showResult(`win ${getCurrentPlayer().getName()}`);
            flag = true
            return;
        })
        if (!Gameboard.includes("") && flag===false) {
            console.log("Draw");
            displayController.showResult('Draw');
            return;
        }
    }

    return { createPlayer, playRound, checkWin }
})()