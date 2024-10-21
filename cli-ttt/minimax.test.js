import { minimax } from "./computerMoves.js" // Adjust the path as necessary

describe("minimax", () => {
  test("should return 10 for a winning move for X at depth 0", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 0
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 for a winning move for X at depth 1", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 1
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 for a winning move for X at depth 2", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 2
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 for a winning move for X at depth 3", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 3
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return 10 for a winning move for X at depth 4", () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const depth = 4
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      10 - depth
    )
  })

  test("should return -10 for a winning move for O at depth 0", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 0
    const isMaximizing = false
    const currentPlayer = "O"
    const opponent = "X"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      -10 + depth
    )
  })

  test("should return -10 for a winning move for O at depth 1", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 1
    const isMaximizing = false
    const currentPlayer = "O"
    const opponent = "X"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      -10 + depth
    )
  })

  test("should return -10 for a winning move for O at depth 2", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 2
    const isMaximizing = false
    const currentPlayer = "O"
    const opponent = "X"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      -10 + depth
    )
  })

  test("should return -10 for a winning move for O at depth 3", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 3
    const isMaximizing = false
    const currentPlayer = "O"
    const opponent = "X"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      -10 + depth
    )
  })

  test("should return -10 for a winning move for O at depth 4", () => {
    const board = ["X", "X", " ", "O", "O", "O", " ", " ", " "]
    const depth = 4
    const isMaximizing = false
    const currentPlayer = "O"
    const opponent = "X"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(
      -10 + depth
    )
  })

  test("should return 0 for a draw", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"]
    const depth = 4
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    expect(minimax(board, depth, isMaximizing, currentPlayer, opponent)).toBe(0)
  })

  test("should correctly switch between maximizing and minimizing players", () => {
    const board = ["X", "O", "X", " ", "O", " ", " ", "X", " "]
    const depth = 0
    const isMaximizing = true
    const currentPlayer = "X"
    const opponent = "O"
    // X to move, should block O's winning move
    expect(
      minimax(board, depth, isMaximizing, currentPlayer, opponent)
    ).toBeLessThan(10)

    const board2 = ["X", "O", "X", " ", "O", " ", " ", "X", "O"]
    const depth2 = 1
    const isMaximizing2 = false
    const currentPlayer2 = "O"
    const opponent2 = "X"
    // O to move, should block X's winning move
    expect(
      minimax(board2, depth2, isMaximizing2, currentPlayer2, opponent2)
    ).toBeGreaterThan(-10)
  })
})
