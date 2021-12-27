import { v4 as uuid } from "uuid";
import store from "store";

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

const itemTypes = {
  CARD: "card",
};

const index = (category, cards) => {
  let temp = cards.map((card, index) => {
    if (card.category === category) {
      return index + 1;
    } else {
      return 0;
    }
  });
  return Math.max(...temp);
};

//Save to local storage

const saveToLocalStorage = (url) => {
  if (!store.get("history", []).includes(url)) {
    store.set("history", [...store.get("history", []), url]);
  }
  if (store.get("history", []).length > 5) {
    let temp = [...store.get("history")];
    temp.shift();
    store.set("history", temp);
  }
};

export {
  randomColor,
  colors,
  createCard,
  itemTypes,
  index,
  saveToLocalStorage,
};
