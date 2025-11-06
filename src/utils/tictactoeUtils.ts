export type Player = 'X' | 'O' | null;
export type GameBoard = Player[][];
export type GameStatus = 'playing' | 'x-wins' | 'o-wins' | 'draw';

export function createEmptyBoard(): GameBoard {
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
}

export function checkWinner(board: GameBoard): GameStatus {
  // 行をチェック
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    ) {
      return board[row][0] === 'X' ? 'x-wins' : 'o-wins';
    }
  }

  // 列をチェック
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col]
    ) {
      return board[0][col] === 'X' ? 'x-wins' : 'o-wins';
    }
  }

  // 対角線をチェック
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0] === 'X' ? 'x-wins' : 'o-wins';
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2] === 'X' ? 'x-wins' : 'o-wins';
  }

  // 引き分けチェック
  const isFull = board.every(row => row.every(cell => cell !== null));
  if (isFull) {
    return 'draw';
  }

  return 'playing';
}

export function getStatusMessage(
  status: GameStatus,
  currentPlayer: Player
): string {
  switch (status) {
    case 'x-wins':
      return 'Player X Wins! 🎉';
    case 'o-wins':
      return 'Player O Wins! 🎉';
    case 'draw':
      return 'Draw! 🤝';
    case 'playing':
      return `Player ${currentPlayer}'s Turn`;
  }
}
