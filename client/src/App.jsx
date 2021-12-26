import Board from "./components/Board.jsx";
import "./App.css";
import { reducer, StateProvider } from "./hooks";

function App() {
  return (
    <div className="container">
      <StateProvider initialState={{ cards: [] }} reducer={reducer}>
        <Board />
      </StateProvider>
    </div>
  );
}

export default App;
