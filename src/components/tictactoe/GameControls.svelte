<script lang="ts">
  import './GameControls.css';

  export let onNewGame: () => void;
  export let onUndo: () => void;
  export let canUndo: boolean;
</script>

<div class="game-controls">
  <button class="btn btn-new-game" on:click={onNewGame}> New Game </button>
  <button class="btn btn-undo" on:click={onUndo} disabled={!canUndo}>
    Undo Move
  </button>
</div>
