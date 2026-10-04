import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  // Backend se todos lana
  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log("Backend error", err))
  }, [])

  const addTask = async () => {
    if (task.trim() === "") return
    
    const res = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: task })
    })
    const newTask = await res.json()
    setTasks([...tasks, newTask])
    setTask("")
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h2>My To-Do - Day 7 (Full Stack)</h2>
      <div className="input-box">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Naya task likh..."
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text}
            <button className="del-btn" onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
      <p className="footer">Total: {tasks.length} tasks | Full Stack by Amit - Day 7</p>
    </div>
  )
}

export default App