import inquirer from "inquirer"
import computerMoves from "./computerMoves.js"

function drawBoard(board) {
  console.clear()
  board.forEach((row, index) => {
    console.log(row.join(" | "))
    if (index < board.length - 1) {
      console.log("---------")
    }
  })
}

function checkWinner(board, currentPlayer) {
  const winningCombinations = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ]

  return winningCombinations.some((combination) =>
    combination.every(([row, col]) => board[row][col] === currentPlayer)
  )
    ? currentPlayer
    : false
}

function makeMove(board, { row, col }, currentPlayer) {
  board[row][col] = currentPlayer
}

const isBoardFull = (board) =>
  board.every((row) => row.every((cell) => cell !== " "))

const promptMove = async (board, currentPlayer) => {
  const { row, col } = await inquirer.prompt([
    {
      type: "input",
      name: "row",
      message: `Player ${currentPlayer}, enter your move row (1, 2, or 3):`,
      validate: (input) => {
        const row = Number(input)
        return row >= 1 && row <= 3
          ? true
          : "Please enter a valid row (1, 2, or 3)"
      },
    },
    {
      type: "input",
      name: "col",
      message: `Player ${currentPlayer}, enter your move column (1, 2, or 3):`,
      validate: (input) => {
        const col = Number(input)
        return col >= 1 && col <= 3
          ? true
          : "Please enter a valid column (1, 2, or 3)"
      },
    },
  ])

  // console.log(row, col, currentPlayer, board)
  // console.log("board[row - 1][col - 1]", `"${board[row - 1][col - 1]}"`)
  // console.log(board[row - 1][col - 1] === " ")
  if (board[row - 1][col - 1] === " ") {
    board[row - 1][col - 1] = currentPlayer
  } else {
    console.log("That space is already taken!")
    await promptMove(board, currentPlayer)
  }
  return { row: row - 1, col: col - 1 }
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
    const board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]

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

// tester
// const board = [
//   ["X", "O", "X"],
//   ["O", "X", "O"],
//   ["X", " ", "O"],
// ]

// drawBoard(board)
