import inquirer from "inquirer"
import computerMoves from "./computerMoves.js"

function drawBoard(board) {
  console.clear()
  for (let i = 0; i < board.length; i += 3) {
    console.log(board.slice(i, i + 3).join(" | "))
    if (i < board.length - 3) {
      console.log("---------")
    }
  }
}

function checkWinner(board, currentPlayer) {
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ]

  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === currentPlayer)
  )
    ? currentPlayer
    : false
}

function makeMove(board, index, currentPlayer) {
  board[index] = currentPlayer
}

const isBoardFull = (board) =>
  board.every((cell) => cell === "X" || cell === "O")

const promptMove = async (board, currentPlayer) => {
  const { move } = await inquirer.prompt([
    {
      type: "input",
      name: "move",
      message: `Player ${currentPlayer}, enter your move square (1-9) or 'q' to quit:`,
      validate: (input) => {
        if (input.toLowerCase() === "q") {
          return true
        }
        const move = Number(input)
        return move >= 1 &&
          move <= 9 &&
          board[move - 1] !== "X" &&
          board[move - 1] !== "O"
          ? true
          : "Please enter a valid, empty move square (1-9) or 'q' to quit."
      },
    },
  ])

  if (move.toLowerCase() === "q") {
    console.log("Game ended by player.")
    process.exit()
  }

  const index = Number(move - 1)
  board[index] = currentPlayer
  return index
}

async function promptPlayAgain() {
  const { playAgain } = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
      default: true,
    },
  ])
  return playAgain
}

async function playGame() {
  const { againstComputer } = await inquirer.prompt([
    {
      type: "confirm",
      name: "againstComputer",
      message: "Would you like to play against the computer?",
      default: true,
    },
  ])

  let playAgain = true

  while (playAgain) {
    const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

    let currentPlayer = "X"
    let winner = null

    while (!winner && !isBoardFull(board)) {
      drawBoard(board)
      let move
      if (currentPlayer === "O" && againstComputer) {
        move = computerMoves(board, currentPlayer)
      } else {
        move = await promptMove(board, currentPlayer)
      }

      try {
        makeMove(board, move, currentPlayer)
      } catch {
        console.log("Invalid move. Try again.")
        continue
      }

      // check for winner
      winner = checkWinner(board, currentPlayer)

      if (!winner) {
        currentPlayer = currentPlayer === "X" ? "O" : "X"
      }
    }

    drawBoard(board)
    if (winner) {
      console.log(`Player ${winner} wins!`)
    } else {
      console.log("It's a tie!")
    }
    playAgain = await promptPlayAgain()
  }
}

playGame()
