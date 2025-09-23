<script lang="ts">
  import type { Todo } from "../../utils/localStorageTodo";

  export let todo: Todo;
  export let onToggle: (id: number) => void;
  export let onRemove: (id: number) => void;
</script>

<li class="todo-item">
  <label>
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => onToggle(todo.id)}
    />
    <span class:completed={todo.completed}>{todo.text}</span>
  </label>
  <button on:click={() => onRemove(todo.id)} class="remove-button"
    >Remove</button
  >
</li>
