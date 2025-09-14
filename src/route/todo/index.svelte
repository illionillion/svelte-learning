<script lang="ts">
  import "./index.css";

  let newTodo = "";
  let todos: {
    id: number;
    text: string;
    completed: boolean;
  }[] = [];

  function addTodo() {
    if (newTodo.trim()) {
      // Logic to add the new todo
      todos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
      newTodo = "";
    }
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
  }
</script>

<main class="todo-container">
  <h1 class="todo-title">Todo List</h1>

  <form class="todo-input-area" on:submit|preventDefault={addTodo}>
      <input type="text" placeholder="Add a new todo" bind:value={newTodo} />
      <button type="submit">Add</button>
  </form>

  <ul class="todo-list">
    {#each todos as todo (todo.id)}
    <li class="todo-item">
      <label>
        <input type="checkbox" bind:checked={todo.completed} />
        <span class:completed={todo.completed}>{todo.text}</span>
      </label>
      <button on:click={() => removeTodo(todo.id)}>Remove</button>
    </li>
    {/each}
  </ul>

  <a href="#/">Go to Home</a>
</main>
