<script lang="ts">
  export let currentPage: string = '';
  export let onToggleSidebar: () => void;
  
  const appTitle = "Svelte Learning";
</script>

<header class="header">
  <div class="header-content">
    <button class="sidebar-toggle" on:click={onToggleSidebar} aria-label="Toggle navigation menu">
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

<style>
  @import '../../styles/common.css';
  
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    height: 60px;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .sidebar-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: var(--transition-fast);
    border-radius: var(--border-radius-small);
  }
  
  .sidebar-toggle:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .hamburger-line {
    width: 24px;
    height: 3px;
    background: var(--text-dark);
    border-radius: 2px;
    transition: var(--transition-fast);
  }
  
  .app-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-dark);
  }
  
  .title-link {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-fast);
  }
  
  .title-link:hover {
    color: var(--button-primary);
  }
  
  .header-actions {
    width: 40px; /* sidebar-toggleと同じ幅を確保してタイトルを中央寄せ */
  }
  
  @media (max-width: 768px) {
    .header-content {
      padding: 0 0.5rem;
    }
    
    .app-title {
      font-size: 1.2rem;
    }
  }
</style>