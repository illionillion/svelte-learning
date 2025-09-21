<script lang="ts">
  import "./index.css";
  import AddTodoForm from "../../components/todo/AddTodoForm.svelte";
  import TodoList from "../../components/todo/TodoList.svelte";

  let newTodo = "";
  let todos: { id: number; text: string; completed: boolean }[] = [];

  function handleInput(e: Event) {
    newTodo = (e.target as HTMLInputElement).value;
  }

  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
      newTodo = "";
    }
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function toggleTodo(id: number) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function clearTodos() {
    todos = [];
  }
</script>

<main class="todo-container">
  <h1 class="todo-title">Todo List</h1>

  <AddTodoForm {newTodo} onInput={handleInput} onAdd={addTodo} onClear={clearTodos} />
  <TodoList {todos} onToggle={toggleTodo} onRemove={removeTodo} />

  <a href="#/">Go to Home</a>
</main>
