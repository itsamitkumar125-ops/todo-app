import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const getTodos = async () => {
    const res = await fetch('http://localhost:3000/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => { getTodos(); }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    getTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
    getTodos();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
      <div style={{ background: 'white', width: '450px', borderRadius: '16px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', height: 'fit-content' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>✨ My Todo App</h1>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Naya task likho..."
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #e0e0e0', outline: 'none' }}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo} style={{ padding: '12px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((t) => (
            <li key={t._id} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7ff', padding: '12px 15px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #667eea' }}>
              <span>{t.text}</span>
              <button onClick={() => deleteTodo(t._id)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer' }}>X</button>
            </li>
          ))}
        </ul>
        <p style={{ textAlign: 'center', marginTop: '15px', color: '#888', fontSize: '12px' }}>MongoDB Connected ✅ - {todos.length} tasks</p>
      </div>
    </div>
  );
}
export default App;