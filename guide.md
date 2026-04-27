// TODO: uuid 패키지에서 v4 함수를 import 하세요.
// 힌트: import { v4 as uuidv4 } from 'uuid'
// uuidv4() 를 호출하면 'e4f9...' 같은 고유한 문자열이 반환됩니다.

// ======================================================
// 1) 상태(State)
// ======================================================

// TODO: 투두 리스트 상태(todos)를 useState 로 선언하세요.
// 힌트:
// - 각 투두는 { id, content, isDone } 형태의 객체입니다.
// - 초기값은 빈 배열([]) 로 시작하세요.
// - 예) const [todos, setTodos] = useState([])

// TODO: 입력창의 현재 값을 관리할 상태(content)를 useState 로 선언하세요.
// 힌트: 초기값은 빈 문자열('') 입니다.

// ======================================================
// 2) 이벤트 핸들러 (Create / Delete / Toggle)
// ======================================================

// TODO: [Create] form 의 submit 이벤트 핸들러 handleSubmit 을 작성하세요.
// 힌트:
// 1) 파라미터로 이벤트 객체(e) 를 받고, 맨 처음에 e.preventDefault() 로
// 기본 새로고침 동작을 막습니다.
// 2) content.trim() 이 빈 문자열이면 return 으로 함수를 바로 종료하세요.
// (공백만 입력된 경우 추가되지 않도록)
// 3) 새 투두 객체를 만드세요.
// { id: uuidv4(), content, isDone: false }
// 4) setTodos 로 기존 배열 끝에 새 투두를 붙입니다.
// 예) setTodos((prev) => [...prev, newTodo])
// 5) setContent('') 로 입력창을 비웁니다.

// TODO: [Delete] 삭제 함수 handleDelete 를 작성하세요.
// 힌트:
// - id 를 파라미터로 받습니다.
// - filter 로 해당 id 가 "아닌" 투두들만 남긴 새 배열을 만들고
// setTodos 로 교체합니다.

// TODO: [Toggle] 완료/취소 토글 함수 handleToggle 을 작성하세요.
// 힌트:
// - id 를 파라미터로 받습니다.
// - map 을 사용해 투두 배열을 순회합니다.
// - 같은 id 라면 { ...todo, isDone: !todo.isDone } 처럼
// isDone 값을 반전시킨 새 객체로 교체합니다.
// - 그 외 투두는 그대로 둡니다.

// ======================================================
// 3) 파생 값 (isDone 기준으로 두 리스트로 나누기)
// ======================================================

// TODO: todos 를 isDone 여부에 따라 두 배열로 나누세요.
// 힌트:
// const todoItems = todos.filter((todo) => ...) // 아직 끝나지 않은 일
// const doneItems = todos.filter((todo) => ...) // 끝낸 일

// ======================================================
// 4) 화면 렌더링
// ======================================================

{/_ ---------- 입력 폼 ---------- _/}
{/_ TODO: 아래 form 에 onSubmit={handleSubmit} 을 연결하세요. _/}
{/_ TODO: input 을 controlled component 로 만드세요. - value={content} - onChange={(e) => setContent(e.target.value)} _/}

{/_ TODO: 이 버튼의 type 을 'submit' 으로 지정하세요.
(form 안의 button 기본 type 은 'submit' 이지만 명시하는 습관을 들여보세요.) _/}

{/\_ TODO: todoItems 가 비어있을 때 안내 문구를 보여주세요. (조건부 렌더링)
힌트: todoItems.length === 0 이면

<p className="empty-message">항목이 없습니다</p> _/}

{/\* TODO: todoItems 를 map 으로 순회하며 각 todo 를 <li> 로 렌더링하세요.
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

\*/}

{/_ ===================== 완료한 일 섹션 ===================== _/}
{/_ TODO: doneItems 가 비어있을 때 안내 문구를 보여주세요. _/}

{/_ TODO: doneItems 를 map 으로 순회하며 각 todo 를 <li> 로 렌더링하세요.
힌트: '할 일' 섹션과 거의 동일합니다. 단, 두 가지가 다릅니다. - 토글 버튼 텍스트를 '완료' 대신 '취소' 로 바꿉니다. - (도전) <p> 의 className 을 "todo-content done" 으로 하면
CSS 상 취소선이 그어집니다. _/}

/\* ============================================================

- [level-3 미션] 수정 기능 추가하기
-
- 각 투두 카드에 "수정" 버튼을 추가합니다.
- 수정 버튼을 누르면 해당 카드 하나만 "수정 모드" 로 바뀌어서 내용을
- 편집할 수 있고, "수정완료" 버튼을 누르면 다시 "조회 모드" 로 돌아가면서
- 변경이 반영됩니다. 다른 카드는 영향을 받지 않습니다.
-
- ***
- 1.  state 를 어디에 둘지 먼저 생각해보세요
-
- - isEditing (수정 모드 여부), draft (편집 중인 입력값)
-        → 해당 카드 밖에서는 아무도 관심 없음. TodoItem 안에 useState 로 둡니다.
-          (level-2 에서 content 를 TodoForm 안에 둔 것과 같은 원리)
-
- - todos 배열은 여전히 App 이 들고 있습니다.
-        수정이 "확정" 되는 순간(수정완료 버튼 클릭) App 에 콜백으로 알려줍니다.
-          → "이 id 의 content 를 이 값으로 바꿔줘"
-
- ***
- 2.  App 에서 할 일
-
- - handleUpdate(id, content) 함수 추가
-        · todos 를 map 으로 순회, 같은 id 이면 content 만 교체
-          (id, isDone 은 그대로 유지 — handleToggle 을 참고하세요)
- - TodoList 에 onUpdate={handleUpdate} props 를 추가로 내려주기
-
- ***
- 3.  TodoList 에서 할 일
-
- - onUpdate 를 props 로 받아서, TodoItem 에 그대로 전달
-      (TodoList 는 중간 통로 역할만)
-
- ***
- 4.  TodoItem 에서 할 일 (이번 레벨의 메인 ★)
-
- - useState 두 개
-        · isEditing : boolean  (초기값 false)
-        · draft     : string
-
- - 조회 모드 (isEditing === false)
-        · 기존 화면 + "수정" 버튼 하나 추가
-        · 수정 버튼 클릭 시:
-            - setDraft(todo.content) 로 현재 내용을 draft 에 복사
-            - setIsEditing(true)
-
- - 수정 모드 (isEditing === true)
-        · content 를 보여주던 <p> 대신 <input> 을 그립니다
-            - draft 로 controlled (value, onChange)
-        · "완료" / "취소" 토글 버튼과 "수정" 버튼 대신 "수정완료" 버튼 하나
-        · 수정완료 클릭 시:
-            - onUpdate(todo.id, draft) 호출
-            - setIsEditing(false)
-
- ※ 삭제(X) 버튼은 두 모드 어디에 둬도 됩니다 (취향).
-
- ***
- 5.  UI 힌트 (미리 준비된 CSS 클래스)
-
- - 수정 모드 input: className="todo-edit-input"
- - 수정 / 수정완료 버튼: className="edit-button"
-
- JSX 조건부 렌더링은 삼항연산자 또는 if/else 분기 중 편한 방법을 쓰세요.
- ============================================================ \*/
