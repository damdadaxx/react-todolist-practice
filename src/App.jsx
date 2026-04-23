import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const handleAdd = (content) => {
    const newTodo = { id: uuidv4(), content, isDone: false }
    setTodos((prev) => [...prev, newTodo])
  }

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  const handleUpdate = (id, content) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      )
    )
  }

  const todoItems = todos.filter((todo) => !todo.isDone)
  const doneItems = todos.filter((todo) => todo.isDone)

  return (
    <main className="app">
      <header className="app-header">
        <h1>To Do List</h1>
      </header>

      <TodoForm onAdd={handleAdd} />

      <div className="todo-sections">
        <TodoList
          title="할 일"
          todos={todoItems}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        <TodoList
          title="완료한 일"
          todos={doneItems}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  )
}

export default App
