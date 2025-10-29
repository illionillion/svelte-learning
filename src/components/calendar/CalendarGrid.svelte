<script lang="ts">
  import { getDayNames, type CalendarDate } from '../../utils/calendarUtils';
  import './CalendarGrid.css';
  
  export let weeks: CalendarDate[][];
  export let onDateClick: (date: CalendarDate) => void = () => {};
  
  const dayNames = getDayNames();
</script>

<div class="calendar-grid">
  <!-- 曜日ヘッダー -->
  <div class="day-header-row">
    {#each dayNames as dayName}
      <div class="day-header">{dayName}</div>
    {/each}
  </div>
  
  <!-- カレンダーの日付 -->
  {#each weeks as week}
    <div class="week-row">
      {#each week as dateItem}
        <button 
          class="date-cell"
          class:current-month={dateItem.isCurrentMonth}
          class:other-month={!dateItem.isCurrentMonth}
          class:today={dateItem.isToday}
          class:previous-month={dateItem.isPreviousMonth}
          class:next-month={dateItem.isNextMonth}
          on:click={() => onDateClick(dateItem)}
          aria-label={`${dateItem.year}年${dateItem.month + 1}月${dateItem.date}日`}
        >
          {dateItem.date}
        </button>
      {/each}
    </div>
  {/each}
</div>