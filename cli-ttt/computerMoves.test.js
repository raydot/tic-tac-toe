import { computerMove } from "./computerMoves.js"

// Test cases
describe("computerMove", () => {
  test("should make a winning move for O", () => {
    const board = ["X", "O", "X", "O", "O", "6", "X", "8", "9"]
    const currentPlayer = "O"
    const expectedMove = 8

    const move = computerMove(board, currentPlayer)
    expect(move).toEqual(expectedMove)
  })

  test("should block opponent's winning move", () => {
    const board = ["X", "O", "X", "O", "X", "6", "7", "8", "O"]
    const currentPlayer = "O"
    const expectedMove = 6

    const move = computerMove(board, currentPlayer)
    expect(move).toEqual(expectedMove)
  })

  test("should make the optimal move", () => {
    const board = ["X", "O", "3", "4", "X", "6", "7", "8", "O"]
    const currentPlayer = "O"
    const expectedMove = 3 // Optimal move for 'O' (index 2, but 1-based index is 3)

    const move = computerMove(board, currentPlayer)
    expect(move).toEqual(expectedMove)
  })
})
