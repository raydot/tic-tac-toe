import inquirer from "inquirer"

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

  return { row: row - 1, col: col - 1 }
}

const updateBoard = (board, row, col, currentPlayer) => {
  // Validate row and col values
  if (row < 0 || row >= board.length || col < 0 || col >= board[row].length) {
    console.log(
      "Invalid move! Row and column must be within the board's bounds."
    )
    return null
  }

  if (board[row][col] === " ") {
    const newBoard = board.map((r, rIndex) =>
      r.map((cell, j) => (rIndex === row && j === col ? currentPlayer : cell))
    )
    return newBoard
  } else {
    console.log("That space is already taken!")
    return null
  }
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

const getComputerMove = (board) => {
  const emptyCells = []
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === " ") {
        emptyCells.push([rowIndex, colIndex])
      }
    })
  })

  if (emptyCells.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[randomIndex]
}

const playGame = async () => {
  let playAgain = true

  while (playAgain) {
    let board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]

    let currentPlayer = "X"
    let winner = null

    while (!winner && !isBoardFull(board)) {
      drawBoard(board)

      let move
      if (currentPlayer === "X") {
        move = await promptMove(board, currentPlayer)
      } else {
        move = getComputerMove(board)
        if (!move) {
          console.log("No valid moves left for the computer.")
          break
        }
        console.log(`Computer move: ${move[0] + 1}, ${move[1] + 1}`)
      }

      if (!move) {
        console.log("Invalid move detected.")
        continue
      }

      const newBoard = updateBoard(board, move[0], move[1], currentPlayer)

      if (newBoard) {
        board = newBoard
        // check for winner
        winner = checkWinner(board, currentPlayer)
        if (!winner) {
          currentPlayer = currentPlayer === "X" ? "O" : "X"
        }
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
