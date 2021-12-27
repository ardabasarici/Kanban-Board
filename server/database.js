const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const boardSchema = new Schema({
  boardId: String,
  cards: Array,
});

const Board = mongoose.model("Board", boardSchema);

const createBoard = async (boardId) => {
  const board = new Board({ boardId: boardId, cards: [] });
  try {
    const createdBoard = await board.save();
    return createdBoard;
  } catch (err) {
    console.error(err);
  }
};

const findBoardById = async (boardId) => {
  try {
    const board = await Board.findOne(
      { boardId: boardId },
      "cards boardId"
    ).exec();
    return board;
  } catch (err) {
    console.error(err);
  }
};

const updateBoard = async (board, newCards) => {
  try {
    board.cards = newCards;
    newBoard = await board.save();
    return newBoard;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createBoard, findBoardById, updateBoard };
