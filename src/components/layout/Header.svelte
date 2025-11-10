<script lang="ts">
  import './Header.css';

  export let onToggleSidebar: () => void;

  const appTitle = 'Svelte Learning';
</script>

<header class="header">
  <div class="header-content">
    <button
      class="sidebar-toggle"
      on:click={onToggleSidebar}
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <h1 class="app-title">
      <a href="#/" class="title-link">{appTitle}</a>
    </h1>

    <div class="header-actions">
      <!-- 将来的にユーザーアクションなどを追加できる領域 -->
    </div>
  </div>
</header>
