<script lang="ts">
  import './Layout.css';
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
