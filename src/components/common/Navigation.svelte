<script lang="ts">
  // 現在のページを受け取って、アクティブなリンクを判定
  export let currentPage: string = '';
  
  const navigationItems = [
    { href: '#/', label: 'Home', key: 'home' },
    { href: '#/todo', label: 'Todo App', key: 'todo' },
    { href: '#/stopwatch', label: 'Stopwatch', key: 'stopwatch' },
    { href: '#/tictactoe', label: 'Tic Tac Toe', key: 'tictactoe' },
    { href: '#/calendar', label: 'Calendar', key: 'calendar' },
    { href: '#/count', label: 'Counter', key: 'count' }
  ];
import '../../styles/common.css';
import './index.css';
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