import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, changeStatusTodoAsync } from "../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TaskDescriptionModal from "./TaskDescriptionModal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [showTodoInfo, setShowTodoInfo] = useState(false);

  const handleShowToDoInfo = () => {
    setShowTodoInfo(!showTodoInfo);
  };
  const deleteTodobtn = () => {
    console.log("delete");
    console.log(todo.id);
    // dispatch event to redux
    dispatch(
      deleteTodoAsync({
        id: todo.id,
      })
    );
  };
  const ChangeStatusTodobtn = (statusvalue) => {
    console.log("Change Status");
    console.log(todo.id);
    // dispatch event to redux
    dispatch(
      changeStatusTodoAsync({
        id: todo.id,
        status: statusvalue,
      })
    );
  };

  return (
    <li className="list-group-item">
      {/* Todo Header */}
      <div className="d-flex justify-content-between row">
        <div className="d-flex align-items-center  m-1  col-sm-12 col-md-3 col-lg-3">
          <b>
            <h1>{todo.title}</h1>
          </b>
        </div>
        <div className="d-flex align-items-center  col-sm-12 col-md-3 col-lg-3">
          <select
            className="form-select mr-sm-1"
            defaultValue={todo.status}
            onChange={(event) => ChangeStatusTodobtn(event.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button
            className={
              showTodoInfo ? "btn btn-danger m-1" : "btn btn-success m-1"
            }
            onClick={handleShowToDoInfo}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <button
            id={todo.id}
            className="btn btn-danger m-1"
            onClick={() => deleteTodobtn()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {/* to do Description it will be Modal*/}

      {showTodoInfo && (
        <TaskDescriptionModal
          todo={todo}
          showTodoInfo={showTodoInfo}
          handleShowToDoInfo={handleShowToDoInfo}
        />
      )}
    </li>
  );
};

export default TodoItem;
