<script lang="ts">
  export let newTodo: string;
  export let onInput: (e: Event) => void;
  export let onAdd: (e: Event) => void;
</script>

<form class="todo-input-area" on:submit|preventDefault={onAdd}>
  <input type="text" placeholder="Add a new todo" bind:value={newTodo} on:input={onInput} />
  <button type="submit" class="add-todo-button">Add</button>
</form>
