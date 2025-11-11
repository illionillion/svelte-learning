// カレンダーメモの型定義
export interface CalendarMemo {
  date: string; // YYYY-MM-DD形式
  memo: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'calendar-memos';

// 日付キーを生成（YYYY-MM-DD形式）
export function createDateKey(
  year: number,
  month: number,
  day: number
): string {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
}

// 全てのメモを取得
export function getAllMemos(): Record<string, CalendarMemo> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// 特定の日付のメモを取得
export function getMemo(
  year: number,
  month: number,
  day: number
): CalendarMemo | null {
  const memos = getAllMemos();
  const dateKey = createDateKey(year, month, day);
  return memos[dateKey] || null;
}

// メモを保存
export function saveMemo(
  year: number,
  month: number,
  day: number,
  memo: string
): void {
  const memos = getAllMemos();
  const dateKey = createDateKey(year, month, day);
  const now = Date.now();

  if (memo.trim() === '') {
    // 空のメモの場合は削除
    delete memos[dateKey];
  } else {
    // メモが存在する場合は更新、存在しない場合は新規作成
    memos[dateKey] = {
      date: dateKey,
      memo: memo.trim(),
      createdAt: memos[dateKey]?.createdAt || now,
      updatedAt: now,
    };
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  } catch {
    // エラーハンドリング: 保存に失敗した場合は無視
  }
}

// メモを削除
export function deleteMemo(year: number, month: number, day: number): void {
  const memos = getAllMemos();
  const dateKey = createDateKey(year, month, day);
  delete memos[dateKey];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  } catch {
    // エラーハンドリング: 削除に失敗した場合は無視
  }
}

// メモが存在するかチェック
export function hasMemo(year: number, month: number, day: number): boolean {
  const memo = getMemo(year, month, day);
  return memo !== null && memo.memo.trim() !== '';
}
