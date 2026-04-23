import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') return
    const newTodo = { id: uuidv4(), content, isDone: false }
    setTodos((prev) => [...prev, newTodo])
    setContent('')
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

  const todoItems = todos.filter((todo) => !todo.isDone)
  const doneItems = todos.filter((todo) => todo.isDone)

  return (
    <main className="app">
      <header className="app-header">
        <h1>To Do List</h1>
      </header>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="할 일을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="add-button">추가</button>
      </form>

      <div className="todo-sections">

        <section className="todo-list">
          <h2 className="todo-list-title">할 일</h2>

          {todoItems.length === 0 && (
            <p className="empty-message">항목이 없습니다</p>
          )}

          <ul className="todo-items">
            {todoItems.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(todo.id)}
                >
                  ✕
                </button>
                <p className="todo-content">{todo.content}</p>
                <button
                  className="toggle-button"
                  onClick={() => handleToggle(todo.id)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="todo-list">
          <h2 className="todo-list-title">완료한 일</h2>

          {doneItems.length === 0 && (
            <p className="empty-message">항목이 없습니다</p>
          )}

          <ul className="todo-items">
            {doneItems.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(todo.id)}
                >
                  ✕
                </button>
                <p className="todo-content done">{todo.content}</p>
                <button
                  className="toggle-button"
                  onClick={() => handleToggle(todo.id)}
                >
                  취소
                </button>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}

export default App
