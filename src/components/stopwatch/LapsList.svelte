<script lang="ts">
  import { formatTime } from "../../utils/stopwatchUtils";
  
  export let laps: number[];
  export let onClearLaps: () => void;
</script>

{#if laps.length > 0}
  <div class="laps-container">
    <div class="laps-header">
      <h3>Lap Times</h3>
      <button class="btn-clear" on:click={onClearLaps}>Clear</button>
    </div>
    <ul class="laps-list">
      {#each laps as lap, index}
        <li class="lap-item">
          <span class="lap-number">Lap {index + 1}</span>
          <span class="lap-time">{formatTime(lap)}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .laps-container {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .laps-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .laps-header h3 {
    margin: 0;
    color: #374151;
  }
  
  .btn-clear {
    background: #f59e0b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .btn-clear:hover {
    background: #d97706;
  }
  
  .laps-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .lap-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .lap-item:last-child {
    border-bottom: none;
  }
  
  .lap-number {
    font-weight: 500;
    color: #6b7280;
  }
  
  .lap-time {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #374151;
  }
</style>