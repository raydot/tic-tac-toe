import { checkWinner } from "./computerMoves.js" // Adjust the path as necessary

describe("checkWinner", () => {
  test('should return "X" for a winning row', () => {
    const board = ["X", "X", "X", "O", "O", " ", " ", " ", " "]
    const player = "X"
    expect(checkWinner(board, player)).toBe("X")
  })

  test('should return "O" for a winning column', () => {
    const board = ["X", "O", "X", " ", "O", " ", "X", "O", " "]
    const player = "O"
    expect(checkWinner(board, player)).toBe("O")
  })

  test('should return "X" for a winning diagonal', () => {
    const board = ["X", "O", " ", "O", "X", " ", " ", " ", "X"]
    const player = "X"
    expect(checkWinner(board, player)).toBe("X")
  })

  test("should return null for no winner", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"]
    const player = "X"
    expect(checkWinner(board, player)).toBe(null)
  })

  test("should return null for an empty board", () => {
    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    const player = "X"
    expect(checkWinner(board, player)).toBe(null)
  })
})
