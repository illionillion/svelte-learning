<script lang="ts">
  import './GameStatus.css';
  import type { GameStatus, Player } from '../../utils/tictactoeUtils';
  import { getStatusMessage } from '../../utils/tictactoeUtils';
  
  export let status: GameStatus;
  export let currentPlayer: Player;
</script>

<div class="game-status">
  <div class="status-message {status}">
    {getStatusMessage(status, currentPlayer)}
  </div>
  
  {#if status === 'playing'}
    <div class="player-indicator">
      <div class="player-badge {currentPlayer === 'X' ? 'active' : ''}">
        <span class="player-symbol x">X</span>
        <span class="player-name">Player 1</span>
      </div>
      <div class="vs">VS</div>
      <div class="player-badge {currentPlayer === 'O' ? 'active' : ''}">
        <span class="player-symbol o">O</span>
        <span class="player-name">Player 2</span>
      </div>
    </div>
  {/if}
</div>