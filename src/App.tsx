import { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  if (loading) {
    return (
      <div className="App" data-testid="app">
        <h1 data-testid="heading">To-Do List Manager</h1>
        <p data-testid="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="App" data-testid="app">
      <h1 data-testid="heading">To-Do List Manager</h1>
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} data-testid={`todo-${todo.id}`}>
            <label data-testid={`todo-label-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span data-testid={`todo-title-${todo.id}`}>{todo.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
