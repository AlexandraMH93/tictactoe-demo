let board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
]

let player = "X"
let gameOver = false
let movements = 0

const cells = [...document.getElementsByTagName("td")]
const message = document.querySelector("h3")
const resetButton = document.querySelector("button")

cells.forEach(cell => cell.addEventListener("click", selectCelll))
resetButton.addEventListener("click",reset)

function selectCelll(e){
    let cell = e.target
    let col = e.target.className.slice(-1)-1
    let row = e.target.parentNode.className.slice(-1)-1

    if(!isSelected(row, col)){
        updateBoard(cell, row, col)
        if(checkWin()){
            playerWin()
        }else if(movements === 9){
            gameOver = true
            playerWin()
        }
        changePlayer()
    }
    console.log(row, col)
}
function isSelected(row, col){
    if(board[row][col] !== "-"){
        return true
    }
    return false
}

function updateBoard(cell, row, col){
    board[row][col] = player
    cell.innerText = player
    cell.classList.add("selected")
    movements++
}
function changePlayer(){
    if(player === "X"){
        player = "O"
    }else{
        player = "X"
    }
    if(movements < 9 && !checkWin()){
        message.innerText = `Jugador: ${player}`
    }
}

function checkWin(){
    if(board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== "-"){
        return true
    }else if(board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== "-"){
        return true
    }else if(board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== "-"){
        return true
    }else if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== "-"){
        return true
    }else if(board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== "-"){
        return true
    }else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== "-"){
        return true
    }else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== "-"){
        return true
    }else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== "-"){
        return true
    }
    return false
}

function playerWin(){
    if(gameOver){
        message.innerText = `Es un empate!`
        cells.forEach(function(cell){
            cell.classList.remove("selected")
            cell.classList.add("tie")
        })
    }else{
        message.innerText = `El jugador ${player} ha ganado!`
        cells.forEach(function(cell){
            cell.classList.remove("selected")
            cell.classList.add("win")
        })
    }
}

function reset(){
    board = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
    ]
    player = "X"
    movements = 0
    gameOver = false
    message.innerText = `Jugador: ${player}`
    cells.forEach(cell => {
        cell.classList.remove("selected")
        cell.classList.remove("win")
        cell.classList.remove("tie")
        cell.innerText = ""
    })
}