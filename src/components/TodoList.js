import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";

const TodoList = () => {
  const [statusfilter, setStatusfilter] = useState("Status...");
  const [priorityfilter, setPriorityfilter] = useState("Priority...");
  const [filterdTodos, setFilterdTodos] = useState();

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const filter = (filterObj) => {
    setFilterdTodos(
      todos.filter(
        (todo) =>
          todo.status === filterObj.status ||
          todo.priority === filterObj.priority
      )
    );
  };
  return (
    <>
      {/* // search element */}
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4 ">
          <div className="input-group mb-1 mr-sm-2">
            <h2> Filters:</h2>
          </div>
        </div>
        <div className=" col-sm-12 col-md-4 col-lg-4 ">
          <div className="input-group mb-2 mr-sm-2">
            <select
              className="form-select mr-sm-1"
              // defaultValue={todo.status}
              onChange={(event) => {
                filter({ status: event.target.value });
                setStatusfilter(event.target.value);
              }}
            >
              <option>Status...</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>
        <div className=" col-sm-12 col-md-4 col-lg-4 ">
          <div className="input-group mb-2 mr-sm-2">
            <select
              className="form-select mr-sm-1"
              onChange={(event) => {
                filter({ priority: event.target.value });
                setPriorityfilter(event.target.value);
              }}
            >
              <option>Priority...</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        {/* <div className=" col-sm-12 col-md-3 col-lg-3 ">
          <div className="input-group mb-2 mr-sm-2">
            <select
              className="form-select mr-sm-1"
              // defaultValue={todo.status}
              // onChange={(event) => ChangeStatusTodobtn(event.target.value)}
            >
              <option>Status...</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div> */}
      </div>
      {/* // todo list element */}
      <ul className="list-group">
        {statusfilter !== "Status..." || priorityfilter !== "Priority..." ? (
          filterdTodos.length > 0 ? (
            filterdTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <h1>No Result Found...</h1>
          )
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
    </>
  );
};

export default TodoList;
