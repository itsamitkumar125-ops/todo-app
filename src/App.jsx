import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")
  const [list, setList] = useState([])

  const addTask = () => {
    if(task === "") return
    setList([...list, task])
    setTask("")
  }

  return (
    <div style={{background:"#111", minHeight:"100vh", color:"white", display:"flex", justifyContent:"center", paddingTop:"50px"}}>
      <div style={{background:"#1a1a1a", padding:"25px", borderRadius:"15px", width:"350px", border:"1px solid #333"}}>
        <h2 style={{color:"#00ff88"}}>My To-Do - Day 4</h2>
        <input 
          value={task} 
          onChange={(e)=>setTask(e.target.value)}
          placeholder="Naya task likh"
          style={{width:"70%", padding:"8px", borderRadius:"10px", border:"none"}}
        />
        <button onClick={addTask} style={{marginLeft:"10px", background:"#00ff88", border:"none", padding:"8px 12px", borderRadius:"10px", fontWeight:"bold"}}>Add</button>
        
        <div style={{marginTop:"20px"}}>
          {list.map((t, i) => (
            <p key={i} style={{background:"#222", padding:"8px", borderRadius:"8px"}}>✅ {t}</p>
          ))}
        </div>
        <p style={{color:"#555", fontSize:"12px", marginTop:"20px"}}>by Amit - linkedin.com/in/itsamitkumar125</p>
      </div>
    </div>
  )
}
export default App