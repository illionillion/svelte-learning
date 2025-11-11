<script lang="ts">
  import {
    getMemo,
    saveMemo,
    deleteMemo,
    createDateKey,
  } from '../../utils/calendarMemo';
  import type { CalendarDate } from '../../utils/calendarUtils';
  import './MemoEditor.css';

  export let selectedDate: CalendarDate | null = null;
  export let onClose: () => void = () => {};

  let memoText = '';
  let isVisible = false;
  let textareaElement: HTMLElement;

  $: if (selectedDate) {
    const existingMemo = getMemo(
      selectedDate.year,
      selectedDate.month,
      selectedDate.date
    );
    memoText = existingMemo?.memo || '';
    isVisible = true;

    // テキストエリアにフォーカスを当てる（次のティックで実行）
    setTimeout(() => {
      if (textareaElement) {
        textareaElement.focus();
      }
    }, 0);
  } else {
    isVisible = false;
  }

  function handleSave() {
    if (selectedDate) {
      saveMemo(
        selectedDate.year,
        selectedDate.month,
        selectedDate.date,
        memoText
      );
      onClose();
    }
  }

  function handleDelete() {
    if (selectedDate) {
      deleteMemo(selectedDate.year, selectedDate.month, selectedDate.date);
      memoText = '';
      onClose();
    }
  }

  function handleCancel() {
    onClose();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleCancel();
    } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSave();
    }
  }

  function formatDate(date: CalendarDate): string {
    const year = date.year;
    const month = date.month + 1;
    const day = date.date;
    return `${year}年${month}月${day}日`;
  }
</script>

{#if isVisible && selectedDate}
  <div class="memo-overlay" on:click={handleCancel} role="presentation">
    <div
      class="memo-editor"
      on:click|stopPropagation
      on:keydown={handleKeydown}
      role="dialog"
      aria-labelledby="memo-title"
      tabindex="-1"
    >
      <div class="memo-header">
        <h3 id="memo-title" class="memo-title">
          {formatDate(selectedDate)}のメモ
        </h3>
        <button
          class="close-button"
          on:click={handleCancel}
          aria-label="メモエディタを閉じる"
        >
          ✕
        </button>
      </div>

      <div class="memo-content">
        <textarea
          bind:this={textareaElement}
          bind:value={memoText}
          class="memo-textarea"
          placeholder="ここにメモを入力してください..."
          on:keydown={handleKeydown}
          rows="6"
        ></textarea>
      </div>

      <div class="memo-actions">
        <div class="action-buttons">
          <button class="btn btn-primary" on:click={handleSave}>
            保存 (Ctrl+Enter)
          </button>
          <button class="btn btn-secondary" on:click={handleCancel}>
            キャンセル (Esc)
          </button>
          {#if memoText.trim()}
            <button class="btn btn-danger" on:click={handleDelete}>
              削除
            </button>
          {/if}
        </div>
        <div class="memo-info">
          {#if selectedDate}
            <small class="date-key"
              >ID: {createDateKey(
                selectedDate.year,
                selectedDate.month,
                selectedDate.date
              )}</small
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
