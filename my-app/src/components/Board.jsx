import React, { useState } from "react";
import TaskList from "./TaskList.jsx";
import { v4 as uuid } from "uuid";
import "./Board.css";
//for Drag and Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = () => {
  const [title, setTitle] = useState("Roadmap");
  const [taskLists, setTaskLists] = useState([
    "Backlog",
    "To do",
    "In progress",
    "Done",
  ]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <h1 className="board_title">{title}</h1>
        <div className="task_list_holder">
          {taskLists.map((TaskListTitle) => {
            return <TaskList title={TaskListTitle} key={uuid()} />;
          })}
          {/*<button className="add_task_list">+add another list</button>*/}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
