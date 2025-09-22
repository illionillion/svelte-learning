<script lang="ts">
  import "./index.css";
  import AddTodoForm from "../../components/todo/AddTodoForm.svelte";
  import TodoList from "../../components/todo/TodoList.svelte";
  import { onMount } from "svelte";
  import { loadTodos, saveTodos, type Todo as LocalTodo } from "../../utils/localStorageTodo";

  let newTodo = "";
  let todos: LocalTodo[] = [];

  function handleInput(e: Event) {
    newTodo = (e.target as HTMLInputElement).value;
  }

  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
      saveTodos(todos);
      newTodo = "";
    }
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
  }

  function toggleTodo(id: number) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
  }

  function clearTodos() {
    todos = [];
    saveTodos(todos);
  }
  onMount(() => {
    todos = loadTodos();
  });
</script>

<main class="todo-container">
  <h1 class="todo-title">Todo List</h1>

  <AddTodoForm {newTodo} onInput={handleInput} onAdd={addTodo} onClear={clearTodos} />
  <TodoList {todos} onToggle={toggleTodo} onRemove={removeTodo} />

  <a href="#/">Go to Home</a>
</main>
