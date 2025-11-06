<script lang="ts">
  let count = 0;
  function increment() {
    count += 1;
  }
  function decrement() {
    if (count === 0) return;
    count -= 1;
  }
  import './index.css';
</script>

<div class="counter-area">
  <div class="counter-value">{count}</div>
  <div class="button-group">
    <button class="btn-increment" on:click={increment}>Increment</button>
    <button class="btn-decrement" on:click={decrement}>Decrement</button>
  </div>
</div>
