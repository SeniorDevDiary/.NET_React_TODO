import React, { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:5000";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/todo")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const addTodo = () => {
    axios
      .post(SERVER_URL + "/api/todo", { name, isComplete: false })
      .then((response) => {
        setTodos([...todos, response.data]);
        setName("");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const toggleComplete = (id) => {
    const todo = todos.find((t) => t.id === id);
    axios
      .put(SERVER_URL + `/api/todo/${id}`, {
        ...todo,
        isComplete: !todo.isComplete,
      })
      .then(() => {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, isComplete: !t.isComplete } : t
          )
        );
      });
  };

  const deleteTodo = (id) => {
    axios.delete(SERVER_URL + `/api/todo/${id}`).then(() => {
      setTodos(todos.filter((t) => t.id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
              }}
            >
              {todo.name}
            </span>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.isComplete ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
