<script lang="ts">
  import './GameBoard.css';
  import type { GameBoard, Player } from '../../utils/tictactoeUtils';

  export let board: GameBoard;
  export let onCellClick: (row: number, col: number) => void;
  export let isGameOver: boolean;
</script>

<div class="game-board">
  {#each board as row, rowIndex}
    {#each row as cell, colIndex}
      <button
        class="cell {cell ? 'filled' : ''} {cell === 'X'
          ? 'x-cell'
          : cell === 'O'
            ? 'o-cell'
            : ''}"
        on:click={() => onCellClick(rowIndex, colIndex)}
        disabled={cell !== null || isGameOver}
      >
        {cell || ''}
      </button>
    {/each}
  {/each}
</div>
