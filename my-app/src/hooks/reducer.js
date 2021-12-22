const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_TAG": {
      return {
        ...state,
        cardTags: state.cardTags.filter((tag) => tag !== action.payload),
      };
    }
    case "ADD_TAG": {
      return { ...state, cardTags: [...state.cardTags, action.payload] };
    }
    case "EDIT_TITLE": {
      return { ...state, cardTitle: action.payload };
    }
    case "EDIT_DESCRIPTION": {
      return { ...state, cardDescription: action.payload };
    }
    case "EDIT_COLOR": {
      return { ...state, cardColor: action.payload };
    }
    default:
      return state;
  }
};

export { reducer };
