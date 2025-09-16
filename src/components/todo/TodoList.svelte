<script lang="ts">
  import TodoItem from "./TodoItem.svelte";
  export let todos: { id: number; text: string; completed: boolean }[];
  export let onToggle: (id: number) => void;
  export let onRemove: (id: number) => void;
</script>

<ul class="todo-list">
  {#each todos as todo (todo.id)}
    <TodoItem {todo} {onToggle} {onRemove} />
  {/each}
</ul>
