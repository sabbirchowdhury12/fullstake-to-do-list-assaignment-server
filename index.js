const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

let tasks = [];

//get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

//get tasks by id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  } else {
    res.json(task);
  }
});

//create task
app.post("/tasks", (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = {
    id: generateUniqeId(),
    title,
    description,
    status,
    dueDate,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//update task
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Task not found" });
  } else {
    const { title, description, status, dueDate } = req.body;
    tasks[index] = {
      ...tasks[index],
      title,
      description,
      status,
      dueDate,
    };
    res.json(tasks[index]);
  }
});

// DELETE a task by ID
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Task not found" });
  } else {
    tasks.splice(index, 1);
    res.sendStatus(204);
  }
});

// generate unique id
function generateUniqeId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
