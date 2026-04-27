import "./App.css";

function App() {
  return (
    <main className='app'>
      <header className='app-header'>
        <h1>To Do List</h1>
      </header>

      {/* ---------- 입력 폼 ---------- */}
      <form className='todo-form'>
        <input
          type='text'
          className='todo-input'
          placeholder='할 일을 입력하세요'
        />

        <button className='add-button'>추가</button>
      </form>

      {/* ---------- 리스트 섹션 (할 일 / 완료한 일) ---------- */}
      <div className='todo-sections'>
        {/* ===================== 할 일 섹션 ===================== */}
        <section className='todo-list'>
          <h2 className='todo-list-title'>할 일</h2>

          <ul className='todo-items'></ul>
        </section>

        {/* ===================== 완료한 일 섹션 ===================== */}
        <section className='todo-list'>
          <h2 className='todo-list-title'>완료한 일</h2>

          <ul className='todo-items'></ul>
        </section>
      </div>
    </main>
  );
}

export default App;
