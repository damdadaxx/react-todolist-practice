function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>
      <p className={todo.isDone ? 'todo-content done' : 'todo-content'}>
        {todo.content}
      </p>
      <button
        className="toggle-button"
        onClick={() => onToggle(todo.id)}
      >
        {todo.isDone ? '취소' : '완료'}
      </button>
    </li>
  )
}

export default TodoItem
