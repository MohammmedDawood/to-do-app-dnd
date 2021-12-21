import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync, changeStatusTodoAsync } from "../redux/todoSlice";
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
        taskIds: todos.filter((task) => {
          if (task.status === "To Do") {
            return task.id;
          }
          return null;
        }),
      },
      inProgressColumn: {
        id: "inProgressColumn",
        title: "In Progress",
        taskIds: todos.filter((task) => {
          if (task.status === "In Progress") {
            return task.id;
          }
          return null;
        }),
      },
      doneColumn: {
        id: "doneColumn",
        title: "Done",
        taskIds: todos.filter((task) => {
          if (task.status === "Done") {
            return task.id;
          }
          return null;
        }),
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["todoColumn", "inProgressColumn", "doneColumn"],
  });
  useEffect(() => {
    setInitialData({
      tasks: todos,
      columns: {
        todoColumn: {
          id: "todoColumn",
          title: "To Do",
          taskIds: todos.filter((task) => {
            if (task.status === "To Do") {
              return task.id;
            }
            return null;
          }),
        },
        inProgressColumn: {
          id: "inProgressColumn",
          title: "In Progress",
          taskIds: todos.filter((task) => {
            if (task.status === "In Progress") {
              return task.id;
            }
            return null;
          }),
        },
        doneColumn: {
          id: "doneColumn",
          title: "Done",
          taskIds: todos.filter((task) => {
            if (task.status === "Done") {
              return task.id;
            }
            return null;
          }),
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ["todoColumn", "inProgressColumn", "doneColumn"],
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

    const start = initialData.columns[source.droppableId];
    const finish = initialData.columns[destination.droppableId];

    if (start === finish) {
      // sort IDS
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(
        destination.index,
        0,
        initialData.tasks.find((task) => task.id === draggableId)
      );

      // sort tasks
      // const newTasks = [];
      // newTaskIds.forEach((taskId) => {
      //   newTasks.push(initialData.tasks.find((task) => task.id === taskId));
      // });
      // console.log(newTasks);

      // new columns
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      console.log(newColumn);

      const newInitialData = {
        ...initialData,
        // tasks: newTasks,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },
      };

      console.log(newInitialData);
      setInitialData(newInitialData);
      return;
    }

    // handlin data between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(
      destination.index,
      0,
      initialData.tasks.find((task) => task.id === draggableId)
    );
    console.log(draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    console.log(newFinish.title);
    const newInitialData = {
      ...initialData,
      // tasks: newTasks,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    console.log(newInitialData);
    setInitialData(newInitialData);
    // Changes status of task in redux
    // dispatch event to redux
    dispatch(
      changeStatusTodoAsync({
        id: draggableId,
        status: newFinish.title,
      })
    );
    // we should bbut all changes to DB backend and state and server
  };

  return (
    <>
      {/* // todo list element */}
      <div className="container">
        <div className="row justify-content-center">
          <DragDropContext onDragEnd={onDragEnd}>
            {initialData.columnOrder.map((columnId) => (
              <Droppable
                droppableId={initialData.columns[columnId].id}
                key={columnId}
              >
                {
                  // Droppable props
                  (provided, snapshot) => (
                    <div className=" border border-dark rounded  col-lg-3 col-md-3 col-sm-12 m-1">
                      <h1 key={columnId} className="m-1">
                        {initialData.columns[columnId].title}
                      </h1>
                      <hr />
                      <ul
                        className="list-group m-3"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={
                          snapshot.isDraggingOver
                            ? { backgroundColor: "lightblue" }
                            : null
                        }
                      >
                        {/* // todo item element */}
                        {initialData.columns[columnId].taskIds.map(
                          (todo, index) => (
                            <TodoItem key={todo.id} todo={todo} index={index} />
                          )
                        )}
                        {provided.placeholder}
                      </ul>
                    </div>
                  )
                }
                {/* <ul className="list-group">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul> */}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TodoList;
