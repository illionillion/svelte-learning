<script lang="ts">
  import { formatTime } from '../../utils/stopwatchUtils';
  import './StopwatchDisplay.css';

  export let elapsed: number;
</script>

<div class="stopwatch-display">
  <div class="time">{formatTime(elapsed)}</div>
</div>
