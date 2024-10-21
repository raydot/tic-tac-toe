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

export default computerMove
