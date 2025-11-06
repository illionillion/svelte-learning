// カレンダー関連のユーティリティ関数

export interface CalendarDate {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
}

/**
 * 指定された年月のカレンダー配列を生成する
 */
export function generateCalendar(
  year: number,
  month: number
): CalendarDate[][] {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 月の最初の日と最後の日を取得
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 月の最初の日の曜日（0: 日曜日）
  const firstDayWeek = firstDay.getDay();

  // 前月の最後の日
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const weeks: CalendarDate[][] = [];
  let currentWeek: CalendarDate[] = [];

  // 前月の日付を埋める
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const date = prevMonthLastDay - i;
    const prevMonth = month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const actualMonth = month === 0 ? 11 : prevMonth;

    currentWeek.push({
      date,
      month: actualMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false,
      isPreviousMonth: true,
      isNextMonth: false,
    });
  }

  // 今月の日付を埋める
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const isToday =
      year === todayYear && month === todayMonth && date === todayDate;

    currentWeek.push({
      date,
      month,
      year,
      isCurrentMonth: true,
      isToday,
      isPreviousMonth: false,
      isNextMonth: false,
    });

    // 土曜日（6）になったら週を完成させる
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // 来月の日付で残りを埋める
  let nextMonthDate = 1;
  while (currentWeek.length < 7) {
    const nextMonth = month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const actualMonth = month === 11 ? 0 : nextMonth;

    currentWeek.push({
      date: nextMonthDate,
      month: actualMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday: false,
      isPreviousMonth: false,
      isNextMonth: true,
    });
    nextMonthDate++;
  }

  // 最後の週を追加
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * 月名を取得する
 */
export function getMonthName(month: number): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month];
}

/**
 * 曜日名を取得する
 */
export function getDayNames(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

/**
 * 年の選択肢を生成する（今年から前後10年）
 */
export function generateYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i);
  }

  return years;
}

/**
 * 月の選択肢を生成する
 */
export function generateMonthOptions(): { value: number; name: string }[] {
  return [
    { value: 0, name: 'January' },
    { value: 1, name: 'February' },
    { value: 2, name: 'March' },
    { value: 3, name: 'April' },
    { value: 4, name: 'May' },
    { value: 5, name: 'June' },
    { value: 6, name: 'July' },
    { value: 7, name: 'August' },
    { value: 8, name: 'September' },
    { value: 9, name: 'October' },
    { value: 10, name: 'November' },
    { value: 11, name: 'December' },
  ];
}

/**
 * 前の月の年月を取得する
 */
export function getPreviousMonth(
  year: number,
  month: number
): { year: number; month: number } {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
}

/**
 * 次の月の年月を取得する
 */
export function getNextMonth(
  year: number,
  month: number
): { year: number; month: number } {
  if (month === 11) {
    return { year: year + 1, month: 0 };
  }
  return { year, month: month + 1 };
}
