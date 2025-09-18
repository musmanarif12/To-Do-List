import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // Save edited text
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: editText.trim() } : t
    ));
    setEditId(null);
    setEditText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          value={input}
          placeholder="Enter a task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            {editId === task.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="edit-buttons">
                  <button
                    type="button"
                    className="save"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(task.id)}
                  className="task-text"
                >
                  {task.text}
                </span>
                <div className="edit-buttons">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => startEdit(task.id, task.text)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
