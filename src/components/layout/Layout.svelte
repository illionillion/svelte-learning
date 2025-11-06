<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  
  export let currentPage: string = '';
  
  let isSidebarOpen = false;
  
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
  
  function closeSidebar() {
    isSidebarOpen = false;
  }
  
  // Escapeキーでサイドバーを閉じる
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isSidebarOpen) {
      closeSidebar();
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="layout">
  <Header onToggleSidebar={toggleSidebar} />
  <Sidebar {currentPage} isOpen={isSidebarOpen} onClose={closeSidebar} />
  
  <main class="main-content" class:sidebar-open={isSidebarOpen}>
    <slot />
  </main>
</div>

<style>
  .layout {
    min-height: 100vh;
    position: relative;
  }
  
  .main-content {
    margin-top: 60px; /* ヘッダーの高さ分 */
    min-height: calc(100vh - 60px);
    transition: margin-left 0.3s ease;
  }
  
  /* デスクトップでサイドバーが開いている時のメインコンテンツ調整 */
  @media (min-width: 769px) {
    .main-content.sidebar-open {
      margin-left: 280px;
    }
  }
  
  @media (min-width: 1200px) {
    .main-content.sidebar-open {
      margin-left: 320px;
    }
  }
</style>