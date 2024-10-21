import computerMove from './computerMoves.js';

// Mock the conversion functions
const convertTo1D = (board2D) => board2D.flat();
const convertTo2D = (index) => ({ row: Math.floor(index / 3), col: index % 3 });

// Mock the minimax function
const minimax = (board, depth, isMaximizing, currentPlayer, opponent) => {
  // Implement a simple mock of minimax for testing purposes
  // This should be replaced with the actual minimax function
  return 0;
};

// Test cases
describe('computerMove', () => {
  test('should make a winning move', () => {
    const board2d = [
      ['X', 'O', 'X'],
      ['O', 'O', ' '],
      ['X', ' ', ' ']
    ];
    const currentPlayer = 'O';
    const expectedMove = { row: 1, col: 2 }; // Winning move for 'O'

    const move = computerMove(board2d, currentPlayer);
    expect(move).toEqual(expectedMove);
  });

  test('should block opponent\'s winning move', () => {
    const board2d = [
      ['X', 'O', 'X'],
      ['O', 'X', ' '],
      [' ', ' ', 'O']
    ];
    const currentPlayer = 'O';
    const expectedMove = { row: 2, col: 0 }; // Blocking move for 'O'

    const move = computerMove(board2d, currentPlayer);
    expect(move).toEqual(expectedMove);
  });

  test('should make the optimal move', () => {
    const board2d = [
      ['X', 'O', ' '],
      [' ', 'X', ' '],
      [' ', ' ', 'O']
    ];
    const currentPlayer = 'O';
    const expectedMove = { row: 2, col: 0 }; // Optimal move for 'O'

    const move = computerMove(board2d, currentPlayer);
    expect(move).toEqual(expectedMove);
  });
});