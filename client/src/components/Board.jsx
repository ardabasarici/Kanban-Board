import React, { useState, useEffect } from "react";
import TaskList from "./TaskList.jsx";
import { v4 as uuid } from "uuid";
import "./Board.css";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import { saveToLocalStorage } from "../helpers";
import store from "store";

//for Drag and Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//for backend
import { getData, sendData } from "../api";
import { useStateValue } from "../hooks";

const Board = () => {
  const [boardId] = useState(useParams().boardId || uuid());
  const [title] = useState("Roadmap");
  const [taskLists] = useState(["Backlog", "To do", "In progress", "Done"]);
  const [cards, dispatch] = useStateValue();

  const history = createBrowserHistory();

  // saving browserhistory on localStorage
  useEffect(() => {
    saveToLocalStorage(history.location.pathname.substring(1));
  }, []);

  //get Data from backend-mongodb and setCards
  useEffect(() => {
    getData(boardId).then((data) => {
      dispatch({ type: "SET_CARDS", payload: data.data.cards });
    });
  }, []);

  // Send Changes to backend-mongodb
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
        <h1 className="board_title">
          {title}
          <Tooltip
            sx={{ marginLeft: "20px" }}
            title={"Click to copy id:  " + boardId}
            arrow
            onClick={() => navigator.clipboard.writeText(boardId)}
          >
            <HelpIcon />
          </Tooltip>
        </h1>
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
