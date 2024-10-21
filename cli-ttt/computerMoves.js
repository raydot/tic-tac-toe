// Computer logic here:

// Winning Combinations on one-d format
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

function convertTo2D(index) {
  const row = Math.floor(index / 3)
  const col = index % 3
  return { row, col }
}

function convertTo1D(board2D) {
  return board2D.flat()
}

export function checkWinner(board, player) {
  // console.log("player", player)
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player)
  )
    ? player
    : null
}

function isBoardFull(board) {
  // DRAW!
  return board.every((cell) => cell !== " ")
}

export function evaluateBoard(board, depth, currentPlayer, opponent) {
  const winnerCurrentPlayer = checkWinner(board, currentPlayer)
  const winnerOpponent = checkWinner(board, opponent)

  if (winnerCurrentPlayer) {
    console.log("Winner:", currentPlayer, "Score:", 10 - depth)
    return 10 - depth
  }
  if (winnerOpponent) {
    console.log("Winner:", opponent, "Score:", depth - 10)
    return depth - 10
  }
  if (isBoardFull(board)) {
    console.log("Draw - Score: 0")
    return 0
  }
  return null // no winner or draw, only losers
}

export function minimax(board, depth, isMaximizing, currentPlayer, opponent) {
  console.log("depth:", depth, "isMaximizing:", isMaximizing, "board:", board)

  const score = evaluateBoard(board, depth, currentPlayer, opponent)
  if (score !== null) {
    return score
  }

  if (isMaximizing) {
    // console.log("MAXING!")
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === " ") {
        board[i] = currentPlayer
        const score = minimax(board, depth + 1, true, opponent, currentPlayer)
        board[i] = " "
        console.log("Maximizing - Move:", i, "Score:", score)
        bestScore = Math.max(score, bestScore)
      }
    }
    console.log("Maximizing - Best score:", bestScore)
    return bestScore
  } else {
    // console.log("MINING!")
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === " ") {
        board[i] = opponent
        const score = minimax(board, depth + 1, false, currentPlayer, opponent)
        board[i] = " "
        console.log("Minimizing - Move:", i, "Score:", score)
        bestScore = Math.min(score, bestScore)
      }
    }
    console.log("Minimizing - Best score:", bestScore)
    return bestScore
  }
}

function computerMove(board2d, currentPlayer) {
  const board = convertTo1D(board2d)
  const opponent = currentPlayer === "X" ? "O" : "X"
  let bestScore = -Infinity
  let bestMove = null

  for (let i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      board[i] = currentPlayer
      const score = minimax(board, 0, false, opponent, currentPlayer)
      board[i] = " "
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  console.log("Best move:", convertTo2D(bestMove), "Best score:", bestScore)
  return bestMove !== null ? convertTo2D(bestMove) : null
}

// MEDIUM SMART VERSION BELOW THIS LINE:
/** 
function findWinningOrBlockingMove(board, player) {
  for (const combination of winningCombinations) {
    const cells = combination.map((index) => board[index])

    if (
      cells.filter((cell) => cell === player).length === 2 &&
      cells.includes(" ")
    ) {
      const emptyIndex = cells.indexOf(" ")
      return convertTo2D(combination[emptyIndex])
    }
  }
  return null
}

function computerMove(board2D, currentPlayer) {
  // Midly smart version, will play block or win if available.
  // convert the 2d board to a 1d board.
  const board = convertTo1D(board2D)
  // console.log(board)
  let opponent = currentPlayer === "X" ? "O" : "X"

  // Check for winning move
  let move = findWinningOrBlockingMove(board, currentPlayer)
  if (move) return move

  // Check for blocking move
  move = findWinningOrBlockingMove(board, opponent)
  if (move) return move

  // If no blocking move, find the first empty cell.
  const emptyCell = board.findIndex((cell) => cell === " ")

  return emptyCell !== -1 ? convertTo2D(emptyCell) : null

  // First iteration, find the next empty cell.
  // const emptyCell = board
  //   .flatMap((row, rowIndex) =>
  //     row.map((cell, colIndex) =>
  //       cell === " " ? { row: rowIndex, col: colIndex } : null
  //     )
  //   )
  //   .find((cell) => cell !== null)

  // return emptyCell
}
*/

export default computerMove
