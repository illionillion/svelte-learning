<script lang="ts">
  import './StopwatchControls.css';

  export let isRunning: boolean;
  export let elapsed: number;
  export let onStart: () => void;
  export let onPause: () => void;
  export let onStop: () => void;
  export let onReset: () => void;

  function handlePlayPause() {
    if (isRunning) {
      onPause();
    } else {
      onStart();
    }
  }
</script>

<div class="controls">
  <button class="btn btn-play-pause" on:click={handlePlayPause}>
    {#if !isRunning && elapsed === 0}
      Start
    {:else if isRunning}
      Pause
    {:else}
      Resume
    {/if}
  </button>
  <button class="btn btn-stop" on:click={onStop} disabled={elapsed === 0}>
    Stop
  </button>
  <button class="btn btn-reset" on:click={onReset} disabled={elapsed === 0}>
    Reset
  </button>
</div>
