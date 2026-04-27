import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

/* ============================================================
 * [level-3 미션] 수정 기능 추가하기
 *
 *   각 투두 카드에 "수정" 버튼을 추가합니다.
 *   수정 버튼을 누르면 해당 카드 하나만 "수정 모드" 로 바뀌어서 내용을
 *   편집할 수 있고, "수정완료" 버튼을 누르면 다시 "조회 모드" 로 돌아가면서
 *   변경이 반영됩니다. 다른 카드는 영향을 받지 않습니다.
 *
 * ------------------------------------------------------------
 * 1) state 를 어디에 둘지 먼저 생각해보세요
 *
 *    - isEditing (수정 모드 여부), draft (편집 중인 입력값)
 *        → 해당 카드 밖에서는 아무도 관심 없음. TodoItem 안에 useState 로 둡니다.
 *          (level-2 에서 content 를 TodoForm 안에 둔 것과 같은 원리)
 *
 *    - todos 배열은 여전히 App 이 들고 있습니다.
 *        수정이 "확정" 되는 순간(수정완료 버튼 클릭) App 에 콜백으로 알려줍니다.
 *          → "이 id 의 content 를 이 값으로 바꿔줘"
 *
 * ------------------------------------------------------------
 * 2) App 에서 할 일
 *
 *    - handleUpdate(id, content) 함수 추가
 *        · todos 를 map 으로 순회, 같은 id 이면 content 만 교체
 *          (id, isDone 은 그대로 유지 — handleToggle 을 참고하세요)
 *    - TodoList 에 onUpdate={handleUpdate} props 를 추가로 내려주기
 *
 * ------------------------------------------------------------
 * 3) TodoList 에서 할 일
 *
 *    - onUpdate 를 props 로 받아서, TodoItem 에 그대로 전달
 *      (TodoList 는 중간 통로 역할만)
 *
 * ------------------------------------------------------------
 * 4) TodoItem 에서 할 일 (이번 레벨의 메인 ★)
 *
 *    - useState 두 개
 *        · isEditing : boolean  (초기값 false)
 *        · draft     : string
 *
 *    - 조회 모드 (isEditing === false)
 *        · 기존 화면 + "수정" 버튼 하나 추가
 *        · 수정 버튼 클릭 시:
 *            - setDraft(todo.content) 로 현재 내용을 draft 에 복사
 *            - setIsEditing(true)
 *
 *    - 수정 모드 (isEditing === true)
 *        · content 를 보여주던 <p> 대신 <input> 을 그립니다
 *            - draft 로 controlled (value, onChange)
 *        · "완료" / "취소" 토글 버튼과 "수정" 버튼 대신 "수정완료" 버튼 하나
 *        · 수정완료 클릭 시:
 *            - onUpdate(todo.id, draft) 호출
 *            - setIsEditing(false)
 *
 *    ※ 삭제(X) 버튼은 두 모드 어디에 둬도 됩니다 (취향).
 *
 * ------------------------------------------------------------
 * 5) UI 힌트 (미리 준비된 CSS 클래스)
 *
 *    - 수정 모드 input:  className="todo-edit-input"
 *    - 수정 / 수정완료 버튼: className="edit-button"
 *
 *    JSX 조건부 렌더링은 삼항연산자 또는 if/else 분기 중 편한 방법을 쓰세요.
 * ============================================================ */

function App() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (content) => {
    const newTodo = { id: uuidv4(), content, isDone: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const handleUpdate = (id, content) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo,
      ),
    );
  };

  const todoItems = todos.filter((todo) => !todo.isDone);
  const doneItems = todos.filter((todo) => todo.isDone);

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>To Do List</h1>
      </header>

      <TodoForm onAdd={handleAdd} />

      <div className='todo-sections'>
        <TodoList
          title='할 일'
          todos={todoItems}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        <TodoList
          title='완료한 일'
          todos={doneItems}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  );
}

export default App;
