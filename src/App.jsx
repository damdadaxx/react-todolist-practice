import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

/* ============================================================
 * [level-2 미션] 아래 App.jsx 는 level-1 에서 완성한 결과물입니다.
 *              (한 파일에 state / 핸들러 / 폼 / 리스트 / 카드 가 전부 들어있음)
 *
 *   이번 단계의 목표는 이 코드를 "컴포넌트 3개" 로 쪼개는 것입니다.
 *   기능과 화면은 지금과 똑같이 동작해야 합니다. 오직 구조만 바꿉니다.
 *
 * ------------------------------------------------------------
 * 1) 만들 컴포넌트 (src/components/ 폴더를 직접 생성하세요)
 *
 *    - TodoForm  : 입력 폼 (input + 추가 버튼)
 *    - TodoList  : 한 섹션 전체 (제목 + 비었을 때 안내 문구 + ul/map)
 *    - TodoItem  : 투두 카드 하나 (X 삭제 버튼 + 내용 + 완료/취소 버튼)
 *
 *    App.jsx 는 "상태(todos)와 핸들러를 들고 있는 부모" 역할만 하게 됩니다.
 *
 * ------------------------------------------------------------
 * 2) props 설계 힌트
 *
 *    - <TodoForm onAdd={...} />
 *        · onAdd 는 부모가 넘겨주는 함수. TodoForm 이 submit 될 때
 *          onAdd(content) 로 호출하세요.
 *
 *    - <TodoList title="..." todos={...} onToggle={...} onDelete={...} />
 *        · 같은 컴포넌트를 두 번 쓰지만 title 과 todos 만 달라집니다.
 *          '할 일' / '완료한 일' 섹션을 하나의 TodoList 로 재사용하세요.
 *
 *    - <TodoItem todo={...} onToggle={...} onDelete={...} />
 *        · 한 개의 투두 객체를 통째로 받습니다.
 *          내부에서 todo.content, todo.isDone, todo.id 를 꺼내 씁니다.
 *
 * ------------------------------------------------------------
 * 3) 고급 리팩터링 포인트 ★
 * (이 설명은 참고만 하세요. 이 부분 이해안되면 일단 본인 생각대로해서 컴포넌트분리를 먼저 해내세요)
 *
 *    지금 App 안의 handleSubmit 함수는 두 가지 일을 같이 하고 있습니다.
 *      (a) 폼 이벤트 처리 → e.preventDefault(), content 읽고 초기화
 *      (b) 데이터 변경    → 새 투두 객체 생성 + setTodos
 *
 *    컴포넌트를 분리할 때 이 둘도 함께 쪼개야 합니다.
 *      - App 에는 handleAdd(content) 를 두세요.
 *          · content 문자열만 받아서 { id, content, isDone } 객체를 만들고
 *            setTodos 로 추가하는 "데이터 책임" 만 담당합니다.
 *      - TodoForm 안에는 자기만의 content state 와 handleSubmit 을 두세요.
 *          · e.preventDefault(), trim 검사, onAdd(content) 호출, 입력창 비우기
 *          · 즉 "폼 책임" 만 담당합니다.
 *
 *    → 각 컴포넌트가 "자기 일" 만 하도록 분리하는 것이 이 과제의 핵심입니다.
 *
 * ------------------------------------------------------------
 * 4) 작업 순서 추천
 *
 *    ① 먼저 src/components 폴더를 만들고 세 파일을 빈 껍데기로 만들어 보세요.
 *         (function 선언 + export default)
 *    ② TodoItem → TodoList → TodoForm 순서로, 안쪽 컴포넌트부터 완성해 보세요.
 *    ③ 마지막에 App.jsx 의 JSX 를 <TodoForm/>, <TodoList/> 로 교체하고,
 *       필요 없어진 state (content) 와 함수 일부도 정리하세요.
 *    ④ 화면이 level-1 때와 똑같이 동작하면 성공입니다.
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
        />

        <TodoList
          title='완료한 일'
          todos={doneItems}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;
