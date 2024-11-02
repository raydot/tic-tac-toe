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
  return board.every((cell) => cell === "X" || cell === "O")
}

export function evaluateBoard(board, depth, currentPlayer, opponent) {
  const winnerCurrentPlayer = checkWinner(board, currentPlayer)
  const winnerOpponent = checkWinner(board, opponent)

  if (winnerCurrentPlayer) {
    // console.log("Winner:", currentPlayer, "Score:", 10 - depth)
    return 10 - depth
  }
  if (winnerOpponent) {
    // console.log("Winner:", opponent, "Score:", depth - 10)
    return depth - 10
  }
  if (isBoardFull(board)) {
    // console.log("Draw - Score: 0")
    return 0
  }
  return null // no winner or draw, only losers
}

export function minimax(board, depth, isMaximizing, currentPlayer, opponent) {
  // console.log("depth:", depth, "isMaximizing:", isMaximizing, "board:", board)

  const score = evaluateBoard(board, depth, currentPlayer, opponent)
  if (score !== null) {
    return score
  }

  let bestScore = isMaximizing ? -Infinity : Infinity
  let bestMove = null

  for (let i = 0; i < board.length; i++) {
    if (board[i] !== "X" && board[i] !== "O") {
      const originalValue = board[i]
      board[i] = currentPlayer
      const score = minimax(
        board,
        depth + 1,
        !isMaximizing,
        opponent,
        currentPlayer
      )
      board[i] = originalValue

      if (isMaximizing) {
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      } else {
        if (score < bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
  }

  if (depth === 0) {
    // console.log("Best move:", bestMove, "Best score:", bestScore)
    return bestMove
  }
  return bestScore
}

export function computerMove(board, currentPlayer) {
  return minimax(
    board,
    0,
    true,
    currentPlayer,
    currentPlayer === "X" ? "O" : "X"
  )
}

export default computerMove
