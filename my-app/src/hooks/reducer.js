const reducer = (state, action) => {
  switch (action.type) {
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
      //return { ...state, cardColor: action.payload };
    }
    case "ADD_CARD": {
      console.log(action.payload);
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
    default:
      return state;
  }
};

export { reducer };
