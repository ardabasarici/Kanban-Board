import { v4 as uuid } from "uuid";

const colors = ["#C440A1", "#6A6DCD", "#D93535", "#307FE2", "#00A88B"];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const createCard = (title, description, category) => {
  return {
    title: title,
    description: description,
    color: randomColor(),
    date: new Date(),
    id: uuid(),
    category: category,
  };
};

// For Drag and Drop
const index = (category, cards) => {
  let temp = cards.map((card, index) => {
    if (card.category === category) {
      return index + 1;
    } else {
      return 0;
    }
  });
  console.log(temp);
  return Math.max(...temp);
};

const itemTypes = {
  CARD: "card",
};

export { randomColor, colors, createCard, itemTypes, index };
