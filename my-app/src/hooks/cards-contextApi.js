import React, { createContext, useContext, useReducer } from "react";

export const CardsContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <CardsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CardsContext.Provider>
);

export const useStateValue = () => useContext(CardsContext);

// exporting as  a custom Hook to easier use
