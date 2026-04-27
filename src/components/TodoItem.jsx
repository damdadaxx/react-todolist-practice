import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function handleStartEdit() {
    if (draft.trim() !== "") {
      onUpdate(todo.id, draft);
    }
    setIsEditing(false);
  }

  function handleFinishEdit() {
    setDraft(todo.content);
    setIsEditing(true);
  }

  return (
    <li className='todo-item'>
      <button className='delete-button' onClick={() => onDelete(todo.id)}>
        ✕
      </button>
      {!isEditing ? (
        <>
          <p className={todo.isDone ? "todo-content done" : "todo-content"}>
            {todo.content}
          </p>
          <button className='toggle-button' onClick={() => onToggle(todo.id)}>
            {todo.isDone ? "취소" : "완료"}
          </button>
          <button
            type='button'
            className='edit-button'
            onClick={handleFinishEdit}
          >
            수정
          </button>
        </>
      ) : (
        <>
          <input
            type='text'
            className='todo-edit-input'
            placeholder='할 일을 입력하세요'
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            type='button'
            className='edit-button'
            onClick={handleStartEdit}
          >
            수정 완료
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
