<script lang="ts">
  import './StopwatchControls.css';
  
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