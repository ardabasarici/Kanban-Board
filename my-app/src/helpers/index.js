import { v4 as uuid } from "uuid";

const colors = ["#C440A1", "#6A6DCD", "#D93535", "#307FE2", "#00A88B"];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const createCard = (title, description, category) => {
  return {
    cardTitle: title,
    cardDescription: description,
    cardColor: randomColor(),
    cardDate: new Date(),
    cardId: uuid(),
    cardCategory: category,
  };
};

const deleteCard = (cards, setCards, id) => {
  setCards(cards.filter((card) => card.cardId !== id));
};

// For Drag and Drop

const itemTypes = {
  CARD: "card",
};

export { randomColor, colors, createCard, deleteCard, itemTypes };