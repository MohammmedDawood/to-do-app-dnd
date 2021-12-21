import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const tasksDone = useSelector(
    (state) => state.todos.filter((item) => item.status === "Done").length
  );
  return <h4 className="mt-3">Total Completed Items: {tasksDone}</h4>;
};

export default TotalCompleteItems;
