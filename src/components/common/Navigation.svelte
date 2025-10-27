<script lang="ts">
  // 現在のページを受け取って、アクティブなリンクを判定
  export let currentPage: string = '';
  
  const navigationItems = [
    { href: '#/', label: 'Home', key: 'home' },
    { href: '#/todo', label: 'Todo App', key: 'todo' },
    { href: '#/stopwatch', label: 'Stopwatch', key: 'stopwatch' },
    { href: '#/tictactoe', label: 'Tic Tac Toe', key: 'tictactoe' },
    { href: '#/count', label: 'Counter', key: 'count' }
  ];
</script>

<nav class="navigation">
  {#each navigationItems as item}
    <a 
      href={item.href}
      class:active={currentPage === item.key}
      aria-current={currentPage === item.key ? 'page' : undefined}
    >
      {item.label}
    </a>
  {/each}
</nav>

<style>
  @import '../../styles/common.css';
  
  /* 共通スタイルはcommon.cssから継承 */
  .navigation a.active {
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-dark);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
</style>