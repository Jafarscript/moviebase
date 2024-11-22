/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// intial State
const initialState = {
  bookmark: JSON.parse(localStorage.getItem("bookmarks") || "[]"), // Default to empty array if not found
  darkTheme: JSON.parse(localStorage.getItem("darkTheme") || "false"), // Default to false if not found
  page: JSON.parse(sessionStorage.getItem("page") || "1"), // Default to page 1 if not found
  selectedGenre: JSON.parse(sessionStorage.getItem("selectedGenre") || '""'), // Default to empty string if not found
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
  }, [state.bookmark]);

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(state.darkTheme));
  }, [state.darkTheme]);

  useEffect(() => {
    sessionStorage.setItem("page", state.page);
    sessionStorage.setItem("selectedGenre", state.selectedGenre)
  }, [state.page, state.selectedGenre])

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

  const setPage = (page) => {
    dispatch({type: "SET_PAGE", payload: page})
  }

  const setSelectedGenre = (genre) => {
    dispatch({type: "SET_GENRE", payload: genre})
  }

  return (
    <GlobalContext.Provider
      value={{
        bookmark: state.bookmark,
        addMovieToBookMark,
        removeMovieFromBookMark,
        darkTheme: state.darkTheme,
        toogleTheme,
        page: state.page,
        setPage,
        selectedGenre: state.selectedGenre,
        setSelectedGenre
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
