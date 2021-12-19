import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editTodoAsync } from "../redux/todoSlice";

function TaskDescriptionModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(props.showTodoInfo);

  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);
  const [status, setStatus] = useState("To Do");

  const handlesaveChanges = () => {
    console.log("id: " + props.todo.id);
    console.log("title: " + title);
    console.log("description: " + description);
    console.log("status: " + status);

    // dispatch event to redux
    dispatch(
      editTodoAsync({
        id: props.todo.id,
        title,
        description,
        status,
      })
    );

    // close form
    handleClose();
  };
  const handleClose = () => {
    setShow(false);
    props.handleShowToDoInfo();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* to do title */}
          <div className="col-lg-12 col-md-12">
            <div className="input-group mb-2 mr-sm-2 col-3">
              <span className="input-group-text">Title</span>
              <input
                type="text"
                className="form-control "
                placeholder="Add title..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>
          </div>

          {/* to do description */}
          <div className="col-lg-12 col-md-12">
            <div className="input-group mb-2 mr-sm-2 col-3">
              <span className="input-group-text mb-2 mr-sm-2">Description</span>
              <textarea
                className="form-control mb-2 mr-sm-2"
                placeholder="Add description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskDescriptionModal;
