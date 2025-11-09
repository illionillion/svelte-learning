<script lang="ts">
  import './Sidebar.css';
  export let currentPage: string = '';
  export let isOpen: boolean = false;
  export let onClose: () => void;

  const navigationItems = [
    { href: '#/', label: 'Home', key: 'home', icon: '🏠' },
    { href: '#/todo', label: 'Todo App', key: 'todo', icon: '📝' },
    { href: '#/stopwatch', label: 'Stopwatch', key: 'stopwatch', icon: '⏱️' },
    { href: '#/tictactoe', label: 'Tic Tac Toe', key: 'tictactoe', icon: '🎮' },
    { href: '#/calendar', label: 'Calendar', key: 'calendar', icon: '📅' },
    { href: '#/count', label: 'Counter', key: 'count', icon: '🔢' },
  ];

  function handleLinkClick() {
    // モバイルでリンクをクリックしたらサイドバーを閉じる
    if (window.innerWidth <= 768) {
      onClose();
    }
  }

  function handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
</script>

<!-- オーバーレイ -->
{#if isOpen}
  <div
    class="sidebar-overlay"
    on:click={handleOverlayClick}
    on:keydown={e => e.key === 'Escape' && onClose()}
    role="button"
    tabindex="0"
    aria-label="Close navigation menu"
  ></div>
{/if}

<!-- サイドバー -->
<aside class="sidebar" class:open={isOpen}>
  <div class="sidebar-header">
    <h2 class="sidebar-title">Navigation</h2>
    <button
      class="close-button"
      on:click={onClose}
      aria-label="Close navigation menu"
    >
      ✕
    </button>
  </div>

  <nav class="sidebar-nav">
    <ul class="nav-list">
      {#each navigationItems as item}
        <li class="nav-item">
          <a
            href={item.href}
            class="nav-link"
            class:active={currentPage === item.key}
            aria-current={currentPage === item.key ? 'page' : undefined}
            on:click={handleLinkClick}
          >
            <span class="nav-icon">{item.icon}</span>
            <span class="nav-label">{item.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="sidebar-footer">
    <p class="app-version">Svelte Learning v1.0</p>
  </div>
</aside>
