<script lang="ts">
  import { onMount } from "svelte";
  import CalendarHeader from "../../components/calendar/CalendarHeader.svelte";
  import CalendarGrid from "../../components/calendar/CalendarGrid.svelte";
  import Navigation from "../../components/common/Navigation.svelte";
  import { 
    generateCalendar, 
    getPreviousMonth, 
    getNextMonth,
    type CalendarDate 
  } from "../../utils/calendarUtils";
  import "./index.css";
  
  let currentYear: number;
  let currentMonth: number;
  let weeks: CalendarDate[][];
  let selectedDate: CalendarDate | null = null;
  
  // 今日の日付で初期化
  function initializeCalendar() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    updateCalendar();
  }
  
  // カレンダーを更新
  function updateCalendar() {
    weeks = generateCalendar(currentYear, currentMonth);
  }
  
  // 前の月に移動
  function goToPreviousMonth() {
    const prev = getPreviousMonth(currentYear, currentMonth);
    currentYear = prev.year;
    currentMonth = prev.month;
    updateCalendar();
  }
  
  // 次の月に移動
  function goToNextMonth() {
    const next = getNextMonth(currentYear, currentMonth);
    currentYear = next.year;
    currentMonth = next.month;
    updateCalendar();
  }
  
  // 年が変更された時
  function handleYearChange(year: number) {
    currentYear = year;
    updateCalendar();
  }
  
  // 月が変更された時
  function handleMonthChange(month: number) {
    currentMonth = month;
    updateCalendar();
  }
  
  // 日付がクリックされた時
  function handleDateClick(date: CalendarDate) {
    selectedDate = date;
    
    // 他の月の日付がクリックされた場合、その月に移動
    if (!date.isCurrentMonth) {
      currentYear = date.year;
      currentMonth = date.month;
      updateCalendar();
    }
  }
  
  // キーボードショートカット
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPreviousMonth();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNextMonth();
        break;
      case 'Home':
        event.preventDefault();
        initializeCalendar();
        break;
    }
  }
  
  onMount(() => {
    document.title = "Calendar | Svelte Learning";
    initializeCalendar();
    
    // キーボードイベントリスナーを追加
    window.addEventListener('keydown', handleKeydown);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<main class="calendar-container">
  <h1 class="calendar-title">Calendar</h1>
  
  <div class="calendar-content">
    <CalendarHeader 
      {currentYear}
      {currentMonth}
      onPreviousMonth={goToPreviousMonth}
      onNextMonth={goToNextMonth}
      onYearChange={handleYearChange}
      onMonthChange={handleMonthChange}
    />
    
    <CalendarGrid 
      {weeks}
      onDateClick={handleDateClick}
    />
    
    {#if selectedDate}
      <div class="selected-date-info">
        <h3>Selected Date</h3>
        <p>
          {selectedDate.year}年 {selectedDate.month + 1}月 {selectedDate.date}日
          {#if selectedDate.isToday}
            <span class="today-badge">Today</span>
          {/if}
        </p>
      </div>
    {/if}
  </div>
  
  <div class="shortcuts">
    <p><strong>Shortcuts:</strong> ← Previous Month, → Next Month, Home = Today</p>
  </div>
  
  <Navigation currentPage="calendar" />
</main>