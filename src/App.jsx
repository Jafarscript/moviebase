// import React from 'react'
import { Routes, Route } from "react-router-dom"
import SiderBar from "./components/SiderBar"
import Movies from "./pages/Movies"
import MoviesInfo from "./pages/MoviesInfo"

const App = () => {
  return (
    <div className="relative">
      <SiderBar />
      <section className="p-5 pl-20">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MoviesInfo />} />
        </Routes>
      </section>
    </div>
  )
}

export default App