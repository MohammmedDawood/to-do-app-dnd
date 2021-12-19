import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todoSlice";

const AddTodoForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("title: " + title);
    console.log("description: " + description);
    console.log("status: " + status);

    // dispatch event to redux
    dispatch(
      addTodoAsync({
        title,
        description,
        status,
      })
    );

    // reset form
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="form-inline row mt-3 mb-3 justify-content-md-center"
    >
      {/* to do title */}
      <div className="col-lg-6 col-md-12">
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

      {/* to do Status */}
      {/* <div className="col-lg-3 col-md-12">
        <div className="input-group mb-2 mr-sm-2 col-3">
          <span className="input-group-text mb-2 mr-sm-2">Status</span>
          <select
            className="form-select mb-2 mr-sm-2"
            defaultValue={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>Choose Status...</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      </div> */}

      {/* to do Submit Button */}

      <div className="col-lg-6 col-md-12">
        <button type="submit" className="btn btn-primary mb-2 col-12">
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
