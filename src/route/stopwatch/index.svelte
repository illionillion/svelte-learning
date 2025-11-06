<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import StopwatchDisplay from '../../components/stopwatch/StopwatchDisplay.svelte';
  import StopwatchControls from '../../components/stopwatch/StopwatchControls.svelte';
  import LapsList from '../../components/stopwatch/LapsList.svelte';
  import Layout from '../../components/layout/Layout.svelte';
  import { getCurrentTime } from '../../utils/stopwatchUtils';
  import './index.css';

  let startTime = 0;
  let elapsed = 0;
  let isRunning = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let laps: number[] = [];

  function start() {
    if (!isRunning) {
      startTime = getCurrentTime() - elapsed;
      isRunning = true;
      intervalId = setInterval(updateElapsed, 10);
    }
  }

  function pause() {
    if (isRunning) {
      isRunning = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  }

  function stop() {
    pause();
    elapsed = 0;
    startTime = 0;
  }

  function reset() {
    stop();
    laps = [];
  }

  function lap() {
    if (isRunning && elapsed > 0) {
      laps = [...laps, elapsed];
    }
  }

  function clearLaps() {
    laps = [];
  }

  function updateElapsed() {
    elapsed = getCurrentTime() - startTime;
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      if (isRunning) {
        pause();
      } else {
        start();
      }
    } else if (event.code === 'KeyR') {
      event.preventDefault();
      reset();
    } else if (event.code === 'KeyS') {
      event.preventDefault();
      stop();
    } else if (event.code === 'KeyL') {
      event.preventDefault();
      lap();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.title = 'Stopwatch | Svelte Learning';
  });

  onDestroy(() => {
    pause();
    document.removeEventListener('keydown', handleKeyPress);
  });
</script>

<Layout currentPage="stopwatch">
  <div class="stopwatch-container">
    <h1 class="stopwatch-title">Stopwatch</h1>

    <StopwatchDisplay {elapsed} />

    <StopwatchControls
      {isRunning}
      {elapsed}
      onStart={start}
      onPause={pause}
      onStop={stop}
      onReset={reset}
    />

    <div class="action-buttons">
      <button
        class="btn btn-lap"
        on:click={lap}
        disabled={!isRunning || elapsed === 0}
      >
        Lap
      </button>
    </div>

    <LapsList {laps} onClearLaps={clearLaps} />

    <div class="shortcuts">
      <p>
        <strong>Shortcuts:</strong> Space = Start/Pause, S = Stop, R = Reset, L =
        Lap
      </p>
    </div>
  </div>
</Layout>
