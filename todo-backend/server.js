import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [{ id: 1, text: "Day 6 Backend Ready!" }];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id)
  res.json({ success: true })
})