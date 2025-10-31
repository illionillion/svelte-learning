<script lang="ts">
  import { onMount } from "svelte";
  import GameBoard from "../../components/tictactoe/GameBoard.svelte";
  import GameStatus from "../../components/tictactoe/GameStatus.svelte";
  import GameControls from "../../components/tictactoe/GameControls.svelte";
  import Layout from "../../components/layout/Layout.svelte";
  import { 
    createEmptyBoard, 
    checkWinner, 
    type GameBoard as GameBoardType, 
    type Player, 
    type GameStatus as GameStatusType 
  } from "../../utils/tictactoeUtils";
  import "./index.css";
  
  let board: GameBoardType = createEmptyBoard();
  let currentPlayer: Player = 'X';
  let gameStatus: GameStatusType = 'playing';
  let moveHistory: { board: GameBoardType; player: Player }[] = [];
  
  function handleCellClick(row: number, col: number) {
    if (board[row][col] !== null || gameStatus !== 'playing') {
      return;
    }
    
    // 履歴を保存
    moveHistory = [...moveHistory, { 
      board: board.map(row => [...row]), 
      player: currentPlayer 
    }];
    
    // ボードを更新
    board[row][col] = currentPlayer;
    board = [...board];
    
    // 勝利判定
    gameStatus = checkWinner(board);
    
    // プレイヤー交代
    if (gameStatus === 'playing') {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
  
  function newGame() {
    board = createEmptyBoard();
    currentPlayer = 'X';
    gameStatus = 'playing';
    moveHistory = [];
  }
  
  function undoMove() {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory[moveHistory.length - 1];
    board = lastMove.board.map(row => [...row]);
    currentPlayer = lastMove.player;
    gameStatus = 'playing';
    moveHistory = moveHistory.slice(0, -1);
  }
  
  onMount(() => {
    document.title = "Tic Tac Toe | Svelte Learning";
  });
</script>

<Layout currentPage="tictactoe">
  <div class="tictactoe-container">
    <h1 class="tictactoe-title">Tic Tac Toe</h1>
    
    <GameStatus status={gameStatus} {currentPlayer} />
    
    <GameBoard 
      {board} 
      onCellClick={handleCellClick}
      isGameOver={gameStatus !== 'playing'}
    />
    
    <GameControls 
      onNewGame={newGame}
      onUndo={undoMove}
      canUndo={moveHistory.length > 0}
    />
  </div>
</Layout>