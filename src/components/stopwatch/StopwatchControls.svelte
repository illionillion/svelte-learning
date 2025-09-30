<script lang="ts">
  export let isRunning: boolean;
  export let onStart: () => void;
  export let onStop: () => void;
  export let onReset: () => void;
</script>

<div class="controls">
  {#if !isRunning}
    <button class="btn btn-start" on:click={onStart}>Start</button>
  {:else}
    <button class="btn btn-stop" on:click={onStop}>Stop</button>
  {/if}
  <button class="btn btn-reset" on:click={onReset}>Reset</button>
</div>

<style>
  .controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }
  
  .btn {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 100px;
  }
  
  .btn-start {
    background: #22c55e;
    color: white;
  }
  
  .btn-start:hover {
    background: #16a34a;
    transform: translateY(-2px);
  }
  
  .btn-stop {
    background: #ef4444;
    color: white;
  }
  
  .btn-stop:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }
  
  .btn-reset {
    background: #6b7280;
    color: white;
  }
  
  .btn-reset:hover {
    background: #4b5563;
    transform: translateY(-2px);
  }
</style>