/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// intial State
const intialState = {
  bookmark: JSON.parse(localStorage.getItem("bookmarks")) || [],
  darkTheme: JSON.parse(localStorage.getItem("darkTheme")) || false,
};

// create context
export const GlobalContext = createContext(intialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, intialState);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
  }, [state.bookmark]);

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(state.darkTheme));
  }, [state.darkTheme]);

  // actions
  const addMovieToBookMark = (id, mediaType) => {
    dispatch({ type: "ADD_MOVIE_TO_BOOKMARK", payload: { id, mediaType } });
  };

  const removeMovieFromBookMark = (id) => {
    dispatch({ type: "REMOVE_M0VIE_FROM_BOOKMARK", payload: { id } });
  };

  const toogleTheme = () => {
    dispatch({ type: "TOOGLE_THEME" });
  };

  return (
    <GlobalContext.Provider
      value={{
        bookmark: state.bookmark,
        addMovieToBookMark,
        removeMovieFromBookMark,
        darkTheme: state.darkTheme,
        toogleTheme,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
