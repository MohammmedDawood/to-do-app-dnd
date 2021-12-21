import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { deleteTodoAsync } from "../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TaskDescriptionModal from "./TaskDescriptionModal";

const TodoItem = (props) => {
  const dispatch = useDispatch();
  const [showTodoInfo, setShowTodoInfo] = useState(false);

  const handleShowToDoInfo = () => {
    setShowTodoInfo(!showTodoInfo);
  };
  const deleteTodobtn = () => {
    console.log("delete");
    console.log(props.todo.id);
    // dispatch event to redux
    dispatch(
      deleteTodoAsync({
        id: props.todo.id,
      })
    );
  };
  // const ChangeStatusTodobtn = (statusvalue) => {
  //   console.log("Change Status");
  //   console.log(props.todo.id);
  //   // dispatch event to redux
  //   dispatch(
  //     changeStatusTodoAsync({
  //       id: props.todo.id,
  //       status: statusvalue,
  //     })
  //   );
  // };

  return (
    <>
      <Draggable draggableId={props.todo.id} index={props.index}>
        {(provided, snapshot) => (
          <li
            className={
              snapshot.isDragging
                ? "list-group-item bg-success"
                : "list-group-item"
            }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* Todo Header */}
            <div className="d-flex justify-content-between row  mx-auto  ">
              <div className="d-flex align-items-center ">
                <b>
                  <h1>{props.todo.title}</h1>
                </b>
              </div>
              <div className="d-flex align-items-end row">
                {/* <select
                  className="form-select mr-sm-1"
                  defaultValue={props.todo.status}
                  onChange={(event) => ChangeStatusTodobtn(event.target.value)}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select> */}
                <button
                  className={
                    showTodoInfo ? "btn btn-danger m-1" : "btn btn-success m-1"
                  }
                  onClick={handleShowToDoInfo}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
                <button
                  id={props.todo.id}
                  className="btn btn-danger m-1"
                  onClick={() => deleteTodobtn()}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </li>
        )}
      </Draggable>
      {/* Todo Description */}
      {showTodoInfo && (
        <TaskDescriptionModal
          todo={props.todo}
          showTodoInfo={showTodoInfo}
          handleShowToDoInfo={handleShowToDoInfo}
        />
      )}
    </>
  );
};

export default TodoItem;
