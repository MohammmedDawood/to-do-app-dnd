import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container bg-white p-4 mt-5">
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center  m-2">
          <h1>My Todo List</h1>
        </span>
        <span className="d-flex align-items-center">
          <button
            className={showForm ? "btn btn-danger" : "btn btn-success"}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close" : "Add a todo"}
          </button>
        </span>
      </div>
      {showForm && <AddTodoForm />}
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default App;
