import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Controlled from "./Controlled";

// TODO: uuid 패키지에서 v4 함수를 import 하세요.
//   힌트: import { v4 as uuidv4 } from 'uuid'
//         uuidv4() 를 호출하면 'e4f9...' 같은 고유한 문자열이 반환됩니다.

function App() {
  // ======================================================
  // 1) 상태(State)
  // ======================================================

  // TODO: 투두 리스트 상태(todos)를 useState 로 선언하세요.
  //   힌트:
  //     - 각 투두는 { id, content, isDone } 형태의 객체입니다.
  //     - 초기값은 빈 배열([]) 로 시작하세요.
  //     - 예) const [todos, setTodos] = useState([])
  const [todos, setTodos] = useState([]);

  // TODO: 입력창의 현재 값을 관리할 상태(content)를 useState 로 선언하세요.
  //   힌트: 초기값은 빈 문자열('') 입니다.
  const [content, setContent] = useState("");

  // ======================================================
  // 2) 이벤트 핸들러 (Create / Delete / Toggle)
  // ======================================================

  // TODO: [Create] form 의 submit 이벤트 핸들러 handleSubmit 을 작성하세요.
  //   힌트:
  //     1) 파라미터로 이벤트 객체(e) 를 받고, 맨 처음에 e.preventDefault() 로
  //        기본 새로고침 동작을 막습니다.
  //     2) content.trim() 이 빈 문자열이면 return 으로 함수를 바로 종료하세요.
  //        (공백만 입력된 경우 추가되지 않도록)
  //     3) 새 투두 객체를 만드세요.
  //          { id: uuidv4(), content, isDone: false }
  //     4) setTodos 로 기존 배열 끝에 새 투두를 붙입니다.
  //          예) setTodos((prev) => [...prev, newTodo])
  //     5) setContent('') 로 입력창을 비웁니다.
  function handleSubmit(e) {
    e.preventDefault();

    if (content.trim() === "") return;
    const newTodo = { id: uuidv4(), content, isDone: false };
    setTodos((prev) => [...prev, newTodo]);
    setContent("");
  }

  // TODO: [Delete] 삭제 함수 handleDelete 를 작성하세요.
  //   힌트:
  //     - id 를 파라미터로 받습니다.
  //     - filter 로 해당 id 가 "아닌" 투두들만 남긴 새 배열을 만들고
  //       setTodos 로 교체합니다.
  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // TODO: [Toggle] 완료/취소 토글 함수 handleToggle 을 작성하세요.
  //   힌트:
  //     - id 를 파라미터로 받습니다.
  //     - map 을 사용해 투두 배열을 순회합니다.
  //     - 같은 id 라면 { ...todo, isDone: !todo.isDone } 처럼
  //       isDone 값을 반전시킨 새 객체로 교체합니다.
  //     - 그 외 투두는 그대로 둡니다.
  function handleToggle(id) {
    setTodos(() =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } :  todo ,
      ),
    );
  }

  // ======================================================
  // 3) 파생 값 (isDone 기준으로 두 리스트로 나누기)
  // ======================================================

  // TODO: todos 를 isDone 여부에 따라 두 배열로 나누세요.
  //   힌트:
  //     const todoItems = todos.filter((todo) => ...)   // 아직 끝나지 않은 일
  //     const doneItems = todos.filter((todo) => ...)   // 끝낸 일
  const todoItems = todos.filter((todo) => !todo.isDone);
  const doneItems = todos.filter((todo) => todo.isDone);

  // ======================================================
  // 4) 화면 렌더링
  // ======================================================

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>To Do List</h1>
      </header>

      {/* ---------- 입력 폼 ---------- */}
      {/* TODO: 아래 form 에 onSubmit={handleSubmit} 을 연결하세요. */}
      <form className='todo-form' onSubmit={handleSubmit}>
        {/* TODO: input 을 controlled component 로 만드세요.
              - value={content}
              - onChange={(e) => setContent(e.target.value)} */}
        <Controlled
          type='text'
          className='todo-input'
          placeholder='할 일을 입력하세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* TODO: 이 버튼의 type 을 'submit' 으로 지정하세요.
              (form 안의 button 기본 type 은 'submit' 이지만 명시하는 습관을 들여보세요.) */}
        <button className='add-button' type='submit'>
          추가
        </button>
      </form>

      {/* ---------- 리스트 섹션 (할 일 / 완료한 일) ---------- */}
      <div className='todo-sections'>
        {/* ===================== 할 일 섹션 ===================== */}
        <section className='todo-list'>
          <h2 className='todo-list-title'>할 일</h2>

          {/* TODO: todoItems 가 비어있을 때 안내 문구를 보여주세요. (조건부 렌더링)
                힌트: todoItems.length === 0 이면
                      <p className="empty-message">항목이 없습니다</p> */}
          {todoItems.length === 0 && (
            <p className='empty-message'>항목이 없습니다</p>
          )}

          <ul className='todo-items'>
            {/* TODO: todoItems 를 map 으로 순회하며 각 todo 를 <li> 로 렌더링하세요.
                  힌트: 반복 렌더링 시 반드시 key={todo.id} 를 지정합니다.
                        각 <li> 안에는 3가지가 들어갑니다.

                    <li className="todo-item" key={todo.id}>
                      1) X 삭제 버튼
                         - className="delete-button"
                         - onClick={() => handleDelete(todo.id)}
                         - 텍스트는 '✕'
                      2) 내용 표시
                         - <p className="todo-content">{todo.content}</p>
                      3) '완료' 버튼 (이 섹션은 아직 끝나지 않은 일만 모아둔 곳)
                         - className="toggle-button"
                         - onClick={() => handleToggle(todo.id)}
                         - 텍스트는 '완료'
                    </li>
             */}
            {todoItems.map((todo) => (
              <li key={todo.id} className='todo-item'>
                <p className='todo-content'>{todo.content}</p>
                <button
                  type='button'
                  className='toggle-button'
                  onClick={() => handleToggle(todo.id)}
                >
                  완료
                </button>
                <button
                  type='button'
                  className='delete-button'
                  onClick={() => handleDelete(todo.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ===================== 완료한 일 섹션 ===================== */}
        <section className='todo-list'>
          <h2 className='todo-list-title'>완료한 일</h2>

          {/* TODO: doneItems 가 비어있을 때 안내 문구를 보여주세요. */}
          {doneItems.length === 0 && (
            <p className='empty-message'>항목이 없습니다</p>
          )}

          <ul className='todo-items'>
            {/* TODO: doneItems 를 map 으로 순회하며 각 todo 를 <li> 로 렌더링하세요.
                  힌트: '할 일' 섹션과 거의 동일합니다. 단, 두 가지가 다릅니다.
                    - 토글 버튼 텍스트를 '완료' 대신 '취소' 로 바꿉니다.
                    - (도전) <p> 의 className 을 "todo-content done" 으로 하면
                      CSS 상 취소선이 그어집니다. */}
            {doneItems.map((todo) => (
              <li key={todo.id} className='todo-item'>
                <p className='todo-content done'>{todo.content}</p>
                <button
                  type='button'
                  className='toggle-button'
                  onClick={() => handleToggle(todo.id)}
                >
                  취소
                </button>
                <button
                  type='button'
                  className='delete-button'
                  onClick={() => handleDelete(todo.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
