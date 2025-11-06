<script lang="ts">
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

<style>
  @import '../../styles/common.css';

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
  }

  .sidebar {
    position: fixed;
    top: 60px; /* ヘッダーの高さ分 */
    left: -280px; /* 幅280pxで左に隠す */
    width: 280px;
    height: calc(100vh - 60px);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.9) 100%
    );
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    z-index: 1001;
    display: flex;
    flex-direction: column;
  }

  .sidebar.open {
    transform: translateX(280px);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .sidebar-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--text-dark);
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--text-dark);
    padding: 0.25rem;
    border-radius: var(--border-radius-small);
    transition: var(--transition-fast);
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .sidebar-nav {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
  }

  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    margin-bottom: 0.25rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    color: var(--text-dark);
    transition: var(--transition-fast);
    border-radius: 0;
  }

  .nav-link:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--button-primary);
  }

  .nav-link.active {
    background: var(--button-primary);
    color: var(--text-light);
    font-weight: 600;
  }

  .nav-link.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--text-light);
  }

  .nav-link {
    position: relative;
  }

  .nav-icon {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }

  .nav-label {
    font-size: 1rem;
  }

  .sidebar-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .app-version {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-dark);
    opacity: 0.7;
    text-align: center;
  }

  /* レスポンシブ対応 */
  @media (max-width: 768px) {
    .sidebar {
      width: 100vw;
      left: -100vw;
    }

    .sidebar.open {
      transform: translateX(100vw);
    }
  }

  @media (min-width: 1200px) {
    .sidebar {
      width: 320px;
      left: -320px;
    }

    .sidebar.open {
      transform: translateX(320px);
    }
  }
</style>
