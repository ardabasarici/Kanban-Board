import React, { useState } from "react";
import TaskList from "./TaskList.jsx";
import { v4 as uuid } from "uuid";
import "./Board.css";
import { useParams } from "react-router-dom";
//for Drag and Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getData, sendData } from "../api.js";
import { useStateValue } from "../hooks";
import { useEffect } from "react";

const Board = () => {
  const [boardId] = useState(useParams().boardId || uuid());

  const [title] = useState("Roadmap");
  const [taskLists] = useState(["Backlog", "To do", "In progress", "Done"]);
  const [cards, dispatch] = useStateValue();

  useEffect(() => {
    getData(boardId).then((data) => {
      dispatch({ type: "SET_CARDS", payload: data.data.cards });
    });
  }, []);

  useEffect(() => {
    try {
      sendData(boardId, cards);
    } catch (err) {
      console.error(err);
    }
  }, [cards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <h1 className="board_title">{title}</h1>
        <div className="task_list_holder">
          {taskLists.map((TaskListTitle) => {
            return <TaskList title={TaskListTitle} key={uuid()} />;
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
