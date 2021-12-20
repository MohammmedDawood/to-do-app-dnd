import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TodoList = () => {
  // get data from redux
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    // console.log("TodoList useEffect");
    dispatch(getTodosAsync());
  }, [dispatch]);

  // DND  Bueatiful Intial data
  const [initialData, setInitialData] = useState({
    tasks: todos,
    columns: {
      todoColumn: {
        id: "todoColumn",
        title: "To do",
        taskIds: todos.map((task) => task.id),
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["todoColumn"],
  });
  useEffect(() => {
    setInitialData({
      tasks: todos,
      columns: {
        todoColumn: {
          id: "todoColumn",
          title: "To do",
          taskIds: todos.map((task) => task.id),
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ["todoColumn"],
    });

    // return () => {
    //   cleanup
    // }
  }, [todos]);
  console.log(initialData);

  const onDragEnd = (result) => {
    // TODO: reorder our column
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = initialData.columns[source.droppableId];

    // sort IDS
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    // sort tasks
    const newTasks = [];
    newTaskIds.forEach((taskId) => {
      newTasks.push(initialData.tasks.find((task) => task.id === taskId));
    });
    console.log(newTasks);

    // new columns
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    console.log(newColumn);

    const newInitialData = {
      ...initialData,
      tasks: newTasks,
      columns: {
        ...initialData.columns,
        [newColumn.id]: newColumn,
      },
    };

    console.log(newInitialData);
    setInitialData(newInitialData);
    // we should bbut all changes to DB backend and state and server
  };

  return (
    <>
      {/* // todo list element */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={initialData.columns["todoColumn"].id}>
          {
            // Droppable props
            (provided, snapshot) => (
              <ul
                className="list-group"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.isDraggingOver
                    ? { backgroundColor: "lightblue" }
                    : null
                }
              >
                {/* // todo item element */}
                {initialData.tasks.map((todo, index) => (
                  <TodoItem key={todo.id} todo={todo} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )
          }
          {/* <ul className="list-group">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul> */}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TodoList;
