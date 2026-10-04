import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks")
    return saved? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (task.trim() === "") return
    setTasks([...tasks, { id: Date.now(), text: task }])
    setTask("")
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id!== id))
  }

  return (
    <div className="container">
      <h2>My To-Do - Day 5 (Pro)</h2>
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
      <p className="footer">Total: {tasks.length} tasks | By Amit - Day 5</p>
    </div>
  )
}

export default App