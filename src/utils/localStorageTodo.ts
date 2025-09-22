export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'svelte_todos';

export function loadTodos(): Todo[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Todo[];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
