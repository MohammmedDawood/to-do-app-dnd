import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

// manage all reducers
export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
