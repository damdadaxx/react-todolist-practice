export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className='todo-item' key={todo.id}>
      <button className='delete-button' onClick={onDelete}>
        ✕
      </button>
      <p className={todo.isDone ? "todo-content done" : "todo-content"}>
        {todo.content}
      </p>
      <button className='toggle-button' onClick={onToggle}>
        {todo.isDone ? "취소" : "완료"}
      </button>
    </li>
  );
}
