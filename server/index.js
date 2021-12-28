const express = require("express");
const path = require("path");
const cors = require("cors");
const { createBoard, updateBoard, findBoardById } = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/:boardId", async (req, res) => {
  try {
    board = await findBoardById(req.params.boardId);
    if (!board) {
      board = await createBoard(req.params.boardId);
    }
    board = await updateBoard(board, req.body.cards);
    res.status(200).send(board);
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
});

app.get("/:boardId", async (req, res) => {
  try {
    const board = await findBoardById(req.params.boardId);
    if (board) {
      res.json(board);
    } else {
      const board = await createBoard(req.params.boardId);
      res.json(board);
    }
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log(`app listening at http://localhost:5000`);
});
