import { v4 as uuid } from "uuid";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CARDS": {
      return {
        ...state,
        cards: action.payload,
      };
    }
    case "CLEAR_TAG": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              tags: card.tags.filter((tag) => tag !== action.payload),
            };
          }
        }),
      };
    }
    case "ADD_TAG": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              tags: [...card.tags, action.payload],
            };
          }
        }),
      };
    }
    case "EDIT_TITLE": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              title: action.payload,
            };
          }
        }),
      };
    }
    case "EDIT_DESCRIPTION": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              description: action.payload,
            };
          }
        }),
      };
    }
    case "EDIT_COLOR": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              color: action.payload,
            };
          }
        }),
      };
    }
    case "ADD_CARD": {
      return {
        ...state,
        cards: [
          ...state.cards,
          {
            title: action.payload.title,
            description: action.payload.description,
            color: action.payload.color,
            date: action.payload.date,
            id: action.payload.id,
            category: action.payload.category,
            tags: [],
          },
        ],
      };
    }
    case "DELETE_CARD": {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
      };
    }

    case "CHANGE_CATEGORY": {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id !== action.id) {
            return card;
          } else {
            return {
              ...card,
              category: action.category,
            };
          }
        }),
      };
    }
    case "SET_NEW_POSITION": {
      let newCards = [...state.cards];
      let card = state.cards.filter((card) => card.id === action.id);
      card[0] = { ...card[0], id: uuid() };
      newCards.splice(action.index, 0, card[0]);

      return {
        ...state,
        cards: newCards,
      };
    }
    default:
      return state;
  }
};

export { reducer };
