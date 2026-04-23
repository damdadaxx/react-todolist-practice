import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const handleStartEdit = () => {
    setDraft(todo.content)
    setIsEditing(true)
  }

  const handleFinishEdit = () => {
    if (draft.trim() !== '') {
      onUpdate(todo.id, draft)
    }
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>

      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      ) : (
        <p className={todo.isDone ? 'todo-content done' : 'todo-content'}>
          {todo.content}
        </p>
      )}

      {isEditing ? (
        <button className="edit-button" onClick={handleFinishEdit}>
          수정완료
        </button>
      ) : (
        <>
          <button
            className="toggle-button"
            onClick={() => onToggle(todo.id)}
          >
            {todo.isDone ? '취소' : '완료'}
          </button>
          <button className="edit-button" onClick={handleStartEdit}>
            수정
          </button>
        </>
      )}
    </li>
  )
}

export default TodoItem
