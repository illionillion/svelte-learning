<script lang="ts">
  import { onMount } from "svelte";
  import { params, push } from "svelte-spa-router";
  import CalendarHeader from "../../components/calendar/CalendarHeader.svelte";
  import CalendarGrid from "../../components/calendar/CalendarGrid.svelte";
  import Layout from "../../components/layout/Layout.svelte";
  import {
    generateCalendar,
    getPreviousMonth,
    getNextMonth,
    type CalendarDate,
  } from "../../utils/calendarUtils";
  import "./index.css";

  // パラメータの型定義
  interface CalendarParams {
    year?: string;
    month?: string;
    day?: string;
  }

  let currentYear: number;
  let currentMonth: number;
  let weeks: CalendarDate[][];
  let selectedDate: CalendarDate | null = null; // URLを更新する関数
  function updateURL(year: number, month: number, day?: number) {
    const monthStr = String(month + 1).padStart(2, "0");
    let newPath = `/calendar/${year}/${monthStr}`;

    if (day !== undefined) {
      const dayStr = String(day).padStart(2, "0");
      newPath += `/${dayStr}`;
    }

    push(newPath);
  }

  // URLパラメータから日付を初期化
  function initializeFromParams(urlParams: CalendarParams) {
    const today = new Date();

    if (urlParams.year && urlParams.month) {
      currentYear = parseInt(urlParams.year);
      currentMonth = parseInt(urlParams.month) - 1; // URLでは1-12、JSでは0-11

      // 選択された日付がある場合
      if (urlParams.day) {
        const day = parseInt(urlParams.day);
        selectedDate = {
          date: day,
          year: currentYear,
          month: currentMonth,
          isCurrentMonth: true,
          isToday: false,
          isPreviousMonth: false,
          isNextMonth: false,
        };

        // 今日の日付かチェック
        const todayDate = new Date();
        if (selectedDate) {
          selectedDate.isToday =
            currentYear === todayDate.getFullYear() &&
            currentMonth === todayDate.getMonth() &&
            day === todayDate.getDate();
        }
      }
    } else {
      // パラメータがない場合は今日の日付で初期化（URLは変更しない）
      currentYear = today.getFullYear();
      currentMonth = today.getMonth();
    }

    updateCalendar();
  }

  // 今日の日付で初期化（非推奨、initializeFromParamsを使用）
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
    selectedDate = null; // 月移動時は日付選択をクリア
    updateCalendar();
    updateURL(currentYear, currentMonth);
  }

  // 次の月に移動
  function goToNextMonth() {
    const next = getNextMonth(currentYear, currentMonth);
    currentYear = next.year;
    currentMonth = next.month;
    selectedDate = null; // 月移動時は日付選択をクリア
    updateCalendar();
    updateURL(currentYear, currentMonth);
  }

  // 年が変更された時
  function handleYearChange(year: number) {
    currentYear = year;
    selectedDate = null; // 年変更時は日付選択をクリア
    updateCalendar();
    updateURL(currentYear, currentMonth);
  }

  // 月が変更された時
  function handleMonthChange(month: number) {
    currentMonth = month;
    selectedDate = null; // 月変更時は日付選択をクリア
    updateCalendar();
    updateURL(currentYear, currentMonth);
  }

  // 日付がクリックされた時
  function handleDateClick(date: CalendarDate) {
    selectedDate = date;

    // 他の月の日付がクリックされた場合、その月に移動
    if (!date.isCurrentMonth) {
      currentYear = date.year;
      currentMonth = date.month;
      updateCalendar();
      updateURL(currentYear, currentMonth, date.date);
    } else {
      // 同じ月の日付がクリックされた場合
      updateURL(currentYear, currentMonth, date.date);
    }
  }

  // キーボードショートカット
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        goToPreviousMonth();
        break;
      case "ArrowRight":
        event.preventDefault();
        goToNextMonth();
        break;
      case "Home":
        event.preventDefault();
        // ホームキーで今日の日付に戻る
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        selectedDate = null;
        updateCalendar();
        updateURL(currentYear, currentMonth);
        break;
    }
  }

  // パラメータの監視とカレンダー更新（初回読み込み後の変更のみ）
  let hasInitialized = false;
  $: if ($params && hasInitialized) {
    initializeFromParams($params as CalendarParams);
  }

  // コンポーネントマウント時の初期化
  onMount(() => {
    document.title = "Calendar | Svelte Learning";

    // 初回読み込み時にURLパラメータから初期化
    const currentParams = $params as CalendarParams;
    if (currentParams && (currentParams.year || currentParams.month)) {
      // URLパラメータがある場合はそれを使用
      initializeFromParams(currentParams);
    } else {
      // パラメータがない場合は今日の日付で初期化（URLは変更しない）
      const today = new Date();
      currentYear = today.getFullYear();
      currentMonth = today.getMonth();
      updateCalendar();
    }

    // 初期化完了フラグを設定
    hasInitialized = true;

    // キーボードイベントリスナーを追加
    window.addEventListener("keydown", handleKeydown);

    // クリーンアップ
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<Layout currentPage="calendar">
  <div class="calendar-container">
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

      <CalendarGrid {weeks} onDateClick={handleDateClick} />

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
      <p>
        <strong>Shortcuts:</strong> ← Previous Month, → Next Month, Home = Today
      </p>
    </div>
  </div>
</Layout>
