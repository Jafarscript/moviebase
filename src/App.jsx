// import React from 'react'
import { Routes, Route } from "react-router-dom"
import SiderBar from "./components/SiderBar"
import Movies from "./pages/Movies"
import MoviesInfo from "./pages/MoviesInfo"

const App = () => {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY
  return (
    <div className="relative">
      <SiderBar />
      <section className="p-5 pl-24">
        <Routes>
          <Route path="/" element={<Movies endpoint={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`} />} />
          <Route path="/movie/:id" element={<MoviesInfo />} />
        </Routes>
      </section>
    </div>
  )
}

export default App