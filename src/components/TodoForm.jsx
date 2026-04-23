import { useState } from 'react'

function TodoForm({ onAdd }) {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') return
    onAdd(content)
    setContent('')
  }

  return (
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
  )
}

export default TodoForm
