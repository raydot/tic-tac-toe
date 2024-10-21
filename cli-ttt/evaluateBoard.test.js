import { evaluateBoard } from "./computerMoves.js" // Adjust the path as necessary

describe("evaluateBoard", () => {
  test("should return 10 - depth for a winning move for currentPlayer at depth 2", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 2
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 - depth for a winning move for currentPlayer at depth 1", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 1
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 - depth for a winning move for currentPlayer at depth 0", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 0
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return depth - 10 for a winning move for opponent at depth 3", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 3
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      depth - 10
    )
  })

  test("should return depth - 10 for a winning move for opponent at depth 2", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 2
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      depth - 10
    )
  })

  test("should return depth - 10 for a winning move for opponent at depth 1", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 1
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(
      depth - 10
    )
  })

  test("should return 0 for a draw", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"]
    const depth = 4
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(0)
  })

  test("should return null for no winner or draw", () => {
    const board = ["X", "O", " ", "O", "X", " ", " ", " ", "O"]
    const depth = 1
    const currentPlayer = "X"
    const opponent = "O"
    expect(evaluateBoard(board, depth, currentPlayer, opponent)).toBe(null)
  })
})
