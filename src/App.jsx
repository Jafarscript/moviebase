// import React from 'react'
import { Routes, Route } from "react-router-dom";
import SiderBar from "./components/SiderBar";
import Movies from "./pages/Movies";
import MoviesInfo from "./pages/MoviesInfo";
// import { useState } from "react";

const App = () => {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;
  // const [aside, setAside] = useState(false)
  return (
    <div className="relative">
      <SiderBar />
      <section className="p-5 pl-24">
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`}
              />
            }
          />
          <Route
            path="/movie"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`}
              />
            }
          />
          <Route
            path="/tv_shows"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`}
              />
            }
          />
          <Route
            path="/trending"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <MoviesInfo />
            }
          />
        </Routes>
      </section>
    </div>
  );
};

export default App;
