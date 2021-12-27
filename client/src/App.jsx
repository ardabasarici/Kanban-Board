import Board from "./components/Board.jsx";
import "./App.css";
import { reducer, StateProvider } from "./hooks";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <StateProvider initialState={{ cards: [] }} reducer={reducer}>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path=":boardId" element={<Board />} />
        </Routes>
      </StateProvider>
    </div>
  );
}

export default App;
