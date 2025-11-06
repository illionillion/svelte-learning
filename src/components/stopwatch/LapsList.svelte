<script lang="ts">
  import { formatTime } from '../../utils/stopwatchUtils';
  import './LapsList.css';

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
