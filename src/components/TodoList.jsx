import TodoItem from "./TodoItem";

function TodoList({ title, todos, onToggle, onDelete, onUpdate }) {
  return (
    <section className='todo-list'>
      <h2 className='todo-list-title'>{title}</h2>

      {todos.length === 0 && <p className='empty-message'>항목이 없습니다</p>}

      <ul className='todo-items'>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
