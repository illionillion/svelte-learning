<script lang="ts">
  import {
    generateYearOptions,
    generateMonthOptions,
  } from '../../utils/calendarUtils';
  import './CalendarHeader.css';

  export let currentYear: number;
  export let currentMonth: number;
  export let onPreviousMonth: () => void;
  export let onNextMonth: () => void;
  export let onYearChange: (year: number) => void;
  export let onMonthChange: (month: number) => void;

  const yearOptions = generateYearOptions();
  const monthOptions = generateMonthOptions();

  function handleYearChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    onYearChange(parseInt(target.value));
  }

  function handleMonthChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    onMonthChange(parseInt(target.value));
  }
</script>

<div class="calendar-header">
  <button
    class="nav-button"
    on:click={onPreviousMonth}
    aria-label="Previous month"
  >
    &#8249;
  </button>

  <div class="date-selector">
    <select
      value={currentYear}
      on:change={handleYearChange}
      class="year-select"
      aria-label="Select year"
    >
      {#each yearOptions as year}
        <option value={year}>{year}</option>
      {/each}
    </select>

    <select
      value={currentMonth}
      on:change={handleMonthChange}
      class="month-select"
      aria-label="Select month"
    >
      {#each monthOptions as month}
        <option value={month.value}>{month.name}</option>
      {/each}
    </select>
  </div>

  <button class="nav-button" on:click={onNextMonth} aria-label="Next month">
    &#8250;
  </button>
</div>
